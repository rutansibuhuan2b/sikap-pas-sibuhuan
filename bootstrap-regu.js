require('dotenv').config();
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const dbPath = path.resolve(process.env.DB_PATH || './data/sikap-pas.sqlite');
const [usernameArg, password, regu] = process.argv.slice(2);
const username = String(usernameArg || '').trim();
const allowed = ['Regu I', 'Regu II', 'Regu III', 'Regu IV'];
if (!username || typeof password !== 'string' || password.length < 12 || !allowed.includes(regu)) {
  console.error("Penggunaan: node bootstrap-regu.js USERNAME 'PASSWORD_MINIMAL_12_KARAKTER' 'Regu I|Regu II|Regu III|Regu IV'");
  process.exit(1);
}
const db = new Database(dbPath);
const exists = db.prepare('SELECT id FROM users WHERE username=?').get(username);
if (exists) {
  console.error('Username sudah ada. Pilih username lain; skrip ini tidak mengubah akun yang sudah ada.');
  process.exit(1);
}
const hash = bcrypt.hashSync(password, 12);
const result = db.prepare("INSERT INTO users(username,password_hash,role,regu) VALUES(?,?,'admin_regu',?)").run(username, hash, regu);
console.log(`Akun Admin Regu dibuat untuk ${regu} (ID ${result.lastInsertRowid}). Jangan membagikan password.`);
db.close();
