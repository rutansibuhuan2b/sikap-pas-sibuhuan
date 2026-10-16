require('dotenv').config();
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(process.env.DB_PATH || './data/sikap-pas.sqlite');
const username = String(process.argv[2] || '').trim();
const password = String(process.argv[3] || '');
if (!username || password.length < 12) {
  console.error('Penggunaan: node bootstrap-admin.js USERNAME PASSWORD_MINIMAL_12_KARAKTER');
  process.exit(1);
}
const db = new Database(dbPath);
const exists = db.prepare('SELECT id FROM users WHERE username=?').get(username);
if (exists) {
  console.error('Username sudah ada. Pilih username lain; skrip ini tidak mengubah akun yang sudah ada.');
  process.exit(1);
}
const hash = bcrypt.hashSync(password, 12);
const result = db.prepare("INSERT INTO users(username,password_hash,role,regu) VALUES(?,?,'admin_pengamanan',NULL)").run(username, hash);
console.log(`Admin Pengamanan dibuat dengan ID ${result.lastInsertRowid}. Jangan membagikan password.`);
db.close();
