require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const UPT_ID = String(process.env.UPT_ID || 'rutan-sibuhuan');
const JWT_SECRET = process.env.JWT_SECRET || '';
if (JWT_SECRET.length < 32) {
  console.error('FATAL: JWT_SECRET harus diisi dan minimal 32 karakter. Salin .env.example menjadi .env lalu atur nilainya.');
  process.exit(1);
}
const dbPath = path.resolve(process.env.DB_PATH || './data/sikap-pas.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('admin_pengamanan','admin_regu')),
 regu TEXT,
 active INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS records (
 id TEXT PRIMARY KEY,
 upt_id TEXT NOT NULL DEFAULT 'rutan-sibuhuan',
 type TEXT NOT NULL,
 regu TEXT,
 payload_json TEXT NOT NULL,
 created_by INTEGER NOT NULL REFERENCES users(id),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_records_upt_type ON records(upt_id,type);
CREATE INDEX IF NOT EXISTS idx_records_regu ON records(regu);
CREATE TABLE IF NOT EXISTS audit_logs (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER REFERENCES users(id),
 action TEXT NOT NULL,
 record_type TEXT,
 record_id TEXT,
 detail TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:8080').split(',').map(x => x.trim()), credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false }));

const allowedTypes = new Set(['staff','rooms','transfers','inspections','access','inventory','activities','settings']);
const reguNames = ['Regu I','Regu II','Regu III','Regu IV'];
function audit(user, action, type = null, id = null, detail = null) {
  db.prepare('INSERT INTO audit_logs(user_id,action,record_type,record_id,detail) VALUES(?,?,?,?,?)')
    .run(user?.id || null, action, type, id, detail ? String(detail).slice(0,500) : null);
}
function auth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Token autentikasi diperlukan.' });
  try {
    const claims = jwt.verify(token, JWT_SECRET);
    const user = db.prepare('SELECT id,username,role,regu,active FROM users WHERE id=?').get(claims.sub);
    if (!user || !user.active) return res.status(401).json({ error: 'Akun tidak aktif atau tidak ditemukan.' });
    req.user = user; next();
  } catch { return res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa.' }); }
}
const adminOnly = (req,res,next) => req.user.role === 'admin_pengamanan' ? next() : res.status(403).json({error:'Akses khusus Admin Pengamanan.'});
app.get('/api/health', (req,res) => res.json({status:'ok',service:'SIKAP PAS API',time:new Date().toISOString()}));
app.post('/api/auth/login', (req,res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');
  if (!username || !password) return res.status(400).json({error:'Username dan password wajib diisi.'});
  const user = db.prepare('SELECT * FROM users WHERE username=?').get(username);
  if (!user || !user.active || !bcrypt.compareSync(password,user.password_hash)) {
    audit(null,'login_gagal',null,null,'username='+username); return res.status(401).json({error:'Kredensial tidak sesuai.'});
  }
  const token = jwt.sign({sub:user.id},JWT_SECRET,{expiresIn:'8h',issuer:'sikap-pas-api'});
  audit(user,'login_berhasil');
  res.json({token,expiresIn:28800,user:{id:user.id,username:user.username,role:user.role,regu:user.regu}});
});
app.get('/api/me',auth,(req,res)=>res.json({user:req.user}));
app.get('/api/records',auth,(req,res)=>{
  const type=String(req.query.type||''); const uptId=String(req.query.uptId||UPT_ID);
  if (uptId !== UPT_ID) return res.status(403).json({error:'UPT tidak diizinkan pada server ini.'});
  if (!allowedTypes.has(type)) return res.status(400).json({error:'Jenis data tidak dikenal.'});
  let rows;
  if(req.user.role==='admin_pengamanan' || ['staff','rooms'].includes(type)) rows=db.prepare('SELECT id,type,regu,payload_json,updated_at FROM records WHERE upt_id=? AND type=? ORDER BY updated_at DESC').all(uptId,type);
  else rows=db.prepare('SELECT id,type,regu,payload_json,updated_at FROM records WHERE upt_id=? AND type=? AND regu=? ORDER BY updated_at DESC').all(uptId,type,req.user.regu);
  res.json({items:rows.map(r=>({...r,payload:JSON.parse(r.payload_json)}))});
});
app.post('/api/records',auth,(req,res)=>{
  const {id,type,uptId='rutan-sibuhuan',regu,payload}=req.body||{};
  if(!id||!allowedTypes.has(type)||!payload||typeof payload!=='object'||Array.isArray(payload)) return res.status(400).json({error:'id, type, dan payload wajib valid.'});
  if(String(uptId)!==UPT_ID) return res.status(403).json({error:'UPT tidak diizinkan pada server ini.'});
  const recordRegu = regu || req.user.regu || null;
  if(req.user.role!=='admin_pengamanan' && ['staff','rooms','settings'].includes(type)) return res.status(403).json({error:'Jenis data ini hanya dapat diubah Admin Pengamanan.'});
  if(req.user.role!=='admin_pengamanan' && (!req.user.regu || recordRegu!==req.user.regu)) return res.status(403).json({error:'Admin Regu hanya dapat menulis data regunya sendiri.'});
  if(recordRegu && !reguNames.includes(recordRegu)) return res.status(400).json({error:'Nama regu tidak valid.'});
  if(type==='settings' && req.user.role!=='admin_pengamanan') return res.status(403).json({error:'Pengaturan hanya dapat diubah Admin Pengamanan.'});
  const old=db.prepare('SELECT created_by,upt_id,type,regu FROM records WHERE id=?').get(String(id));
  if(old && req.user.role!=='admin_pengamanan' && (old.created_by!==req.user.id || old.upt_id!==UPT_ID || old.type!==type || old.regu!==recordRegu)) return res.status(403).json({error:'Data ini bukan milik akun/regu Anda atau mencoba mengubah lingkup data; hubungi Admin Pengamanan.'});
  db.prepare(`INSERT INTO records(id,upt_id,type,regu,payload_json,created_by,updated_at) VALUES(?,?,?,?,?,?,datetime('now'))
    ON CONFLICT(id) DO UPDATE SET type=excluded.type,regu=excluded.regu,payload_json=excluded.payload_json,updated_at=datetime('now')`)
    .run(String(id),String(uptId),type,recordRegu,JSON.stringify(payload),req.user.id);
  audit(req.user,'record_simpan',type,String(id),'regu='+String(recordRegu||'-'));
  res.status(201).json({ok:true,id:String(id)});
});
app.delete('/api/records/:id',auth,(req,res)=>{
  const row=db.prepare('SELECT id,upt_id,regu,created_by FROM records WHERE id=?').get(String(req.params.id));
  if (!row) return res.json({ok:true,deleted:0});
  if (row.upt_id!==UPT_ID) return res.status(403).json({error:'UPT tidak diizinkan.'});
  if (req.user.role!=='admin_pengamanan' && (row.regu!==req.user.regu || row.created_by!==req.user.id)) return res.status(403).json({error:'Admin Regu hanya dapat menghapus data regu sendiri yang dibuat oleh akunnya.'});
  const result=db.prepare('DELETE FROM records WHERE id=?').run(String(req.params.id));
  audit(req.user,'record_hapus',null,String(req.params.id),'changes='+result.changes);
  res.json({ok:true,deleted:result.changes});
});
app.get('/api/admin/users',auth,adminOnly,(req,res)=>{
  const users=db.prepare('SELECT id,username,role,regu,active,created_at FROM users ORDER BY username').all();res.json({users});
});
app.post('/api/admin/users',auth,adminOnly,(req,res)=>{
  const {username,password,role,regu}=req.body||{};
  if(!username||typeof password!=='string'||password.length<12||!['admin_pengamanan','admin_regu'].includes(role)) return res.status(400).json({error:'Username, password minimal 12 karakter, dan role valid wajib diisi.'});
  if(role==='admin_regu'&&!['Regu I','Regu II','Regu III','Regu IV'].includes(regu)) return res.status(400).json({error:'Admin Regu wajib dipasangkan dengan Regu I-IV.'});
  try { const info=db.prepare('INSERT INTO users(username,password_hash,role,regu) VALUES(?,?,?,?)').run(String(username).trim(),bcrypt.hashSync(password,12),role,role==='admin_regu'?regu:null);audit(req.user,'user_dibuat',null,String(info.lastInsertRowid),username);res.status(201).json({ok:true,id:info.lastInsertRowid}); }
  catch(e){if(String(e.message).includes('UNIQUE'))return res.status(409).json({error:'Username sudah digunakan.'});throw e;}
});
app.get('/api/admin/audit',auth,adminOnly,(req,res)=>res.json({items:db.prepare('SELECT a.*,u.username FROM audit_logs a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.id DESC LIMIT 500').all()}));
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir, { index: 'index.html', maxAge: '1h' }));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:'Terjadi kesalahan pada server.'});});
app.listen(PORT,()=>console.log(`SIKAP PAS API berjalan pada port ${PORT}. Jangan paparkan ke internet sebelum HTTPS, backup, dan pengamanan deployment disiapkan.`));
