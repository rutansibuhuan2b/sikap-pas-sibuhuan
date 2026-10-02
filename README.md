<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; img-src 'self' data:;">
<title>SIKAP PAS — Sistem Informasi Keamanan dan Pengamanan Pemasyarakatan</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#f4f7fb;color:#182235}
.sidebar{position:fixed;left:0;top:0;bottom:0;width:255px;background:#182b3f;color:white;padding:24px 17px;overflow:auto}
.brand{font-size:24px;font-weight:800}.brand small{display:block;font-size:9.5px;line-height:1.45;opacity:.75;margin-top:5px}
.nav{margin-top:28px}.nav button{width:100%;border:0;background:transparent;color:#dce6ef;text-align:left;padding:12px 13px;border-radius:9px;margin:2px 0;cursor:pointer;font-size:13px}.nav button.active,.nav button:hover{background:#285374;color:#fff}
.main{margin-left:255px;padding:27px 32px}.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}.top h1{margin:0;font-size:25px}.sub{font-size:12px;color:#718096;margin-top:5px}.user{background:#fff;border:1px solid #e1e8f0;padding:10px 14px;border-radius:11px;font-size:12px}
.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:13px}.card{background:#fff;border:1px solid #e4eaf0;border-radius:14px;padding:18px}.label{font-size:11px;color:#738096}.num{font-size:27px;font-weight:800;margin-top:7px}
.grid{display:grid;grid-template-columns:1.45fr 1fr;gap:17px;margin-top:18px}.panel{background:#fff;border:1px solid #e4eaf0;border-radius:14px;padding:19px}.panel h2{font-size:16px;margin:0 0 16px}
table{width:100%;border-collapse:collapse;font-size:12px}th,td{text-align:left;padding:11px 7px;border-bottom:1px solid #edf1f5}th{font-size:10px;text-transform:uppercase;color:#78869a}
.badge{padding:5px 8px;border-radius:16px;font-size:10px;font-weight:700;white-space:nowrap}.blue{background:#e5f0ff;color:#2364ad}.orange{background:#fff0db;color:#a86100}.green{background:#e4f7ed;color:#177346}.red{background:#ffe8e8;color:#a52c2c}.gray{background:#edf0f4;color:#5f6d7e}
button.primary{background:#1c5b8d;color:#fff;border:0;border-radius:8px;padding:9px 13px;font-weight:700;cursor:pointer}button.secondary{background:#eef3f7;color:#28445b;border:0;border-radius:8px;padding:9px 13px;font-weight:700;cursor:pointer}
.steps{display:flex;gap:6px;flex-wrap:wrap}.step{flex:1;min-width:80px;text-align:center;padding:12px 5px;border-radius:9px;background:#f2f5f8;font-size:10px;color:#69778a}.done{background:#e5f6ed!important;color:#19734a!important}.current{background:#e6f0ff!important;color:#2364ad!important;font-weight:700}
.form{display:grid;gap:14px}.form label{font-size:11px;font-weight:700;color:#526174}.form input,.form select,.form textarea{width:100%;padding:11px;border:1px solid #dce4ed;border-radius:8px;margin-top:5px;font:inherit}.actions{display:flex;gap:9px;margin-top:3px;flex-wrap:wrap}
.notice{padding:12px 14px;border-radius:9px;background:#eef6ff;color:#245b91;font-size:11px;line-height:1.55;margin-bottom:15px}.alert{padding:12px 14px;border-radius:9px;background:#fff0f0;color:#963636;font-size:11px;margin-bottom:15px}
.timeline{border-left:2px solid #dce6ef;padding-left:16px}.event{margin-bottom:15px;font-size:12px}.event b{display:block}.event span{font-size:10px;color:#78869a}
.kpi{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #edf1f5}.kpi:last-child{border:0}
.hidden{display:none}
@media(max-width:1050px){.sidebar{width:210px}.main{margin-left:210px}.cards{grid-template-columns:repeat(3,1fr)}}
@media(max-width:700px){.sidebar{position:relative;width:100%;height:auto}.main{margin-left:0;padding:18px}.nav{display:flex;overflow:auto;margin-top:18px}.nav button{min-width:135px}.cards,.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<aside class="sidebar">
 <div class="brand">SIKAP PAS<small>SISTEM INFORMASI KEAMANAN DAN PENGAMANAN PEMASYARAKATAN</small></div>
 <div class="nav">
  <button class="active" onclick="show('dashboard',this)">▣ &nbsp; Dashboard</button>
  <button onclick="show('regu',this)">👥 &nbsp; Regu Pengamanan</button>
  <button onclick="show('serah',this)">⇄ &nbsp; Serah Terima</button>
  <button onclick="show('kontrol',this)">◉ &nbsp; Kontrol & Pemeriksaan</button>
  <button onclick="show('patroli',this)">⌖ &nbsp; Patroli</button>
  <button onclick="show('kejadian',this)">⚠ &nbsp; Laporan Kejadian</button>
  <button onclick="show('warga',this)">▦ &nbsp; Kontrol Penghuni</button>
  <button onclick="show('izin',this)">▤ &nbsp; Perizinan & Akses</button>
  <button onclick="show('inventaris',this)">▣ &nbsp; Inventaris Pengamanan</button>
  <button onclick="show('laporan',this)">▤ &nbsp; Laporan</button>
  <button onclick="show('audit',this)">◷ &nbsp; Audit Trail</button>
  <button onclick="show('pengaturan',this)">⚙ &nbsp; Pengaturan UPT</button>
 </div>
</aside>

<main class="main">
<section id="dashboard">
 <div class="top"><div><h1>Dashboard Pengamanan</h1><div class="sub" id="uptDashboard">RUTAN KELAS IIB SIBUHUAN</div><div class="sub">Monitoring administrasi dan kegiatan pengamanan Rutan Kelas IIB Sibuhuan</div></div><div class="user">👤 Admin Pengamanan</div></div>
 <div class="cards">
  <div class="card"><div class="label">Petugas Bertugas</div><div class="num">18</div></div>
  <div class="card"><div class="label">Regu Bertugas</div><div class="num">3</div></div>
  <div class="card"><div class="label">Kontrol Hari Ini</div><div class="num">24</div></div>
  <div class="card"><div class="label">Laporan Kejadian</div><div class="num">2</div></div>
  <div class="card"><div class="label">Status UPT</div><div class="num" style="font-size:18px;margin-top:13px">TERKENDALI</div></div>
 </div>
 <div class="grid">
  <div class="panel"><h2>Aktivitas Pengamanan Terbaru</h2><table><thead><tr><th>Waktu</th><th>Kegiatan</th><th>Petugas</th><th>Status</th></tr></thead><tbody id="tblAktivitas"><tr><td>18:20</td><td>Serah terima regu</td><td>Regu II</td><td><span class="badge green">Selesai</span></td></tr><tr><td>17:45</td><td>Kontrol blok hunian</td><td>Petugas Jaga</td><td><span class="badge blue">Tercatat</span></td></tr><tr><td>16:30</td><td>Laporan kejadian</td><td>Komandan Jaga</td><td><span class="badge orange">Ditindaklanjuti</span></td></tr></tbody></table></div>
  <div class="panel"><h2>Indikator Pengamanan</h2>
   <div class="kpi"><span>Kehadiran regu</span><span class="badge green">100%</span></div>
   <div class="kpi"><span>Serah terima</span><span class="badge green">Lengkap</span></div>
   <div class="kpi"><span>Kontrol rutin</span><span class="badge blue">24/24</span></div>
   <div class="kpi"><span>Laporan terbuka</span><span class="badge orange">2</span></div>
  </div>
 </div>
</section>

<section id="regu" class="hidden">
 <div class="top"><div><h1>Regu Pengamanan</h1><div class="sub">Penjadwalan, personel, dan status tugas</div></div></div>
 <div class="panel"><div class="notice">Penugasan personel dicatat berdasarkan jadwal resmi. Sistem dikunci setelah disahkan pejabat berwenang.</div>
 <table><thead><tr><th>Regu</th><th>Periode</th><th>Komandan</th><th>Personel</th><th>Status</th></tr></thead><tbody><tr><td>Regu I</td><td>Pagi</td><td>Petugas A</td><td>6</td><td><span class="badge gray">Selesai</span></td></tr><tr><td>Regu II</td><td>Sore</td><td>Petugas B</td><td>6</td><td><span class="badge green">Aktif</span></td></tr><tr><td>Regu III</td><td>Malam</td><td>Petugas C</td><td>6</td><td><span class="badge blue">Terjadwal</span></td></tr></tbody></table></div>
</section>

<section id="serah" class="hidden">
 <div class="top"><div><h1>Serah Terima Pengamanan</h1><div class="sub">Checklist digital pergantian regu</div></div></div>
 <div class="grid"><div class="panel"><h2>Checklist Serah Terima</h2>
 <form class="form" onsubmit="handleSerahTerima(event)">
  <label>Regu<select id="stRegu"><option>Regu II → Regu III</option><option>Regu I → Regu II</option></select></label>
  <label>Komandan Jaga<input id="stKomandan" value="Petugas B" required></label>
  <label>Catatan Situasi<textarea id="stCatatan" rows="4" placeholder="Catatan keadaan umum, kegiatan, atau hal yang perlu diperhatikan" required></textarea></label>
  <label><input type="checkbox" style="width:auto;margin-right:7px" required> Personel sesuai daftar</label>
  <label><input type="checkbox" style="width:auto;margin-right:7px" required> Kondisi fasilitas pengamanan telah diperiksa</label>
  <label><input type="checkbox" style="width:auto;margin-right:7px" required> Informasi kejadian telah disampaikan</label>
  <div class="actions"><button type="submit" class="primary">Sahkan Serah Terima</button></div>
 </form></div>
 <div class="panel"><h2>Status Serah Terima</h2><div class="steps"><div class="step done">Regu Lama</div><div class="step done">Checklist</div><div class="step current">Konfirmasi</div><div class="step">Arsip</div></div></div></div>
</section>

<section id="kontrol" class="hidden">
 <div class="top"><div><h1>Kontrol & Pemeriksaan</h1><div class="sub">Pencatatan pemeriksaan rutin area dan fasilitas</div></div></div>
 <div class="panel"><div class="notice">Gunakan checklist sesuai SOP UPT. Akses lokasi sensitif dibatasi hak akses.</div>
 <table><thead><tr><th>Waktu</th><th>Jenis Kontrol</th><th>Petugas</th><th>Hasil</th><th>Status</th></tr></thead><tbody><tr><td>18:05</td><td>Kontrol rutin</td><td>Regu II</td><td>Normal</td><td><span class="badge green">Selesai</span></td></tr><tr><td>15:30</td><td>Pemeriksaan fasilitas</td><td>Regu II</td><td>Perlu tindak lanjut</td><td><span class="badge orange">Terpantau</span></td></tr></tbody></table><br><button class="primary" onclick="alert('Form kontrol baru diverifikasi sistem.')">＋ Buat Kontrol Baru</button></div>
</section>

<section id="patroli" class="hidden">
 <div class="top"><div><h1>Patroli</h1><div class="sub">Pencatatan kegiatan patroli dan hasil pemeriksaan</div></div></div>
 <div class="panel"><div class="notice">Sistem mencatat waktu, petugas, dan rute SOP. Peta rinci dibatasi hak akses.</div>
 <table><thead><tr><th>Waktu</th><th>Regu</th><th>Jenis</th><th>Hasil</th><th>Status</th></tr></thead><tbody><tr><td>17:20</td><td>Regu II</td><td>Patroli rutin</td><td>Tidak ditemukan anomali</td><td><span class="badge green">Selesai</span></td></tr><tr><td>14:15</td><td>Regu II</td><td>Patroli fasilitas</td><td>1 temuan administratif</td><td><span class="badge orange">Tindak lanjut</span></td></tr></tbody></table></div>
</section>

<section id="kejadian" class="hidden">
 <div class="top"><div><h1>Laporan Kejadian</h1><div class="sub">Pencatatan, eskalasi, dan tindak lanjut kejadian</div></div></div>
 <div class="grid"><div class="panel"><h2>Daftar Kejadian</h2><table><thead><tr><th>Waktu</th><th>Kategori</th><th>Pelapor</th><th>Status</th></tr></thead><tbody><tr><td>16:30</td><td>Gangguan ketertiban</td><td>Komandan Jaga</td><td><span class="badge orange">Ditindaklanjuti</span></td></tr><tr><td>11:20</td><td>Kerusakan fasilitas</td><td>Petugas</td><td><span class="badge blue">Diverifikasi</span></td></tr></tbody></table><br><button class="primary" onclick="show('laporbaru')">＋ Buat Laporan</button></div>
 <div class="panel"><h2>Alur Penanganan</h2><div class="steps"><div class="step done">Lapor</div><div class="step done">Verifikasi</div><div class="step current">Tindak Lanjut</div><div class="step">Selesai</div></div></div></div>
</section>

<section id="warga" class="hidden">
 <div class="top"><div><h1>Kontrol Penghuni</h1><div class="sub">Monitoring jumlah WBP berdasarkan kamar dan blok hunian</div></div></div>
 <div class="cards">
  <div class="card"><div class="label">Total WBP</div><div class="num" id="totalWbp">96</div></div>
  <div class="card"><div class="label">Jumlah Kamar</div><div class="num" id="totalKamar">12</div></div>
  <div class="card"><div class="label">Rata-rata/Kamar</div><div class="num" id="rataWbp">8</div></div>
  <div class="card"><div class="label">Kapasitas Terdata</div><div class="num">120</div></div>
 </div>
 <div class="panel" style="margin-top:18px">
  <div class="actions" style="justify-content:space-between;margin-bottom:15px">
   <h2 style="margin:0">Data Kamar dan Jumlah WBP</h2>
   <button class="primary" onclick="tambahKamar()">＋ Tambah Kamar</button>
  </div>
  <div class="notice">Data kamar dikontrol pengguna berwenang. Setiap perubahan terekam pada Audit Trail.</div>
  <table id="tabelKamar">
   <thead><tr><th>No.</th><th>Blok</th><th>Nama/Nomor Kamar</th><th>Kapasitas</th><th>Jumlah WBP</th><th>Status</th><th>Aksi</th></tr></thead>
   <tbody>
    <tr><td>1</td><td>Blok A</td><td>A-01</td><td>10</td><td>8</td><td><span class="badge green">Normal</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td></tr>
    <tr><td>2</td><td>Blok A</td><td>A-02</td><td>10</td><td>9</td><td><span class="badge orange">Terisi Tinggi</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td></tr>
    <tr><td>3</td><td>Blok B</td><td>B-01</td><td>10</td><td>7</td><td><span class="badge green">Normal</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td></tr>
    <tr><td>4</td><td>Blok B</td><td>B-02</td><td>10</td><td>10</td><td><span class="badge orange">Penuh</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td></tr>
    <tr><td>5</td><td>Blok C</td><td>C-01</td><td>10</td><td>6</td><td><span class="badge green">Normal</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td></tr>
   </tbody>
  </table>
 </div>
 <div class="panel" style="margin-top:18px">
  <h2>Kontrol Perubahan Penghuni</h2>
  <form class="form" onsubmit="simpanPerubahanWbp(event)">
   <label>Jenis Perubahan<select id="pJenis"><option>Penempatan WBP</option><option>Perpindahan Kamar</option><option>Masuk</option><option>Keluar</option></select></label>
   <label>Nama/Nomor Kamar<select id="pKamar"><option>A-01</option><option>A-02</option><option>B-01</option><option>B-02</option><option>C-01</option></select></label>
   <label>Jumlah WBP Setelah Perubahan<input type="number" id="pJumlah" min="0" value="8" required></label>
   <label>Keterangan<textarea id="pKeterangan" rows="3" placeholder="Keterangan perubahan" required></textarea></label>
   <div class="actions"><button type="submit" class="primary">Simpan Perubahan</button></div>
  </form>
 </div>
</section>

<section id="izin" class="hidden">
 <div class="top"><div><h1>Perizinan & Akses</h1><div class="sub">Administrasi akses orang/barang/kegiatan sesuai kewenangan</div></div></div>
 <div class="panel"><table><thead><tr><th>Waktu</th><th>Jenis</th><th>Keperluan</th><th>Petugas</th><th>Status</th></tr></thead><tbody><tr><td>17:10</td><td>Akses kegiatan</td><td>Kegiatan resmi</td><td>Petugas Jaga</td><td><span class="badge green">Disetujui</span></td></tr><tr><td>15:40</td><td>Pengeluaran barang</td><td>Administrasi</td><td>Operator</td><td><span class="badge blue">Diverifikasi</span></td></tr></tbody></table></div>
</section>

<section id="inventaris" class="hidden">
 <div class="top"><div><h1>Inventaris Pengamanan</h1><div class="sub">Administrasi sarana pengamanan secara terkontrol</div></div></div>
 <div class="panel"><div class="notice">Pencatatan inventaris terenkripsi. Peminjaman dan pemeriksaan dicatat elektronik.</div>
 <table><thead><tr><th>Item</th><th>Jumlah</th><th>Kondisi</th><th>Lokasi Administratif</th><th>Status</th></tr></thead><tbody><tr><td>Peralatan komunikasi</td><td>—</td><td>Baik</td><td>Terdata</td><td><span class="badge green">Lengkap</span></td></tr><tr><td>Perlengkapan pengamanan</td><td>—</td><td>Perlu pemeriksaan</td><td>Terdata</td><td><span class="badge orange">Tindak lanjut</span></td></tr></tbody></table></div>
</section>

<section id="laporan" class="hidden">
 <div class="top"><div><h1>Laporan Pengamanan</h1><div class="sub">Rekap kegiatan harian, mingguan, dan bulanan</div></div></div>
 <div class="panel"><div class="form">
  <label>Periode<select><option>Harian</option><option>Mingguan</option><option>Bulanan</option></select></label>
  <label>Jenis Laporan<select><option>Rekap Pengamanan</option><option>Serah Terima</option><option>Kontrol & Pemeriksaan</option><option>Kejadian</option></select></label>
  <div class="actions"><button class="primary" onclick="alert('Laporan berhasil direkap secara aman.')">Generate Laporan</button><button class="secondary">Ekspor</button></div>
 </div></div>
</section>

<section id="audit" class="hidden">
 <div class="top"><div><h1>Audit Trail</h1><div class="sub">Jejak aktivitas pengguna dan perubahan data terenkripsi</div></div></div>
 <div class="panel"><table><thead><tr><th>Waktu</th><th>Pengguna</th><th>Aktivitas</th><th>Modul</th></tr></thead><tbody id="tblAudit"><tr><td>18:20</td><td>Komandan Jaga</td><td>Mengesahkan serah terima</td><td>Serah Terima</td></tr><tr><td>17:45</td><td>Petugas</td><td>Mencatat kontrol rutin</td><td>Kontrol</td></tr><tr><td>16:30</td><td>Komandan Jaga</td><td>Membuat laporan kejadian</td><td>Kejadian</td></tr></tbody></table></div>
</section>

<section id="laporbaru" class="hidden">
 <div class="top"><div><h1>Laporan Kejadian Baru</h1><div class="sub">Form pencatatan kejadian untuk verifikasi dan tindak lanjut</div></div></div>
 <div class="panel"><div class="alert">Isi berdasarkan fakta yang diketahui. Sistem menerapkan klasifikasi akses dan eskalasi otomatis.</div>
 <form class="form" onsubmit="simpanLaporanKejadian(event)"><label>Kategori<select id="lkKategori"><option>Gangguan ketertiban</option><option>Kerusakan fasilitas</option><option>Pelanggaran prosedur</option><option>Kejadian lainnya</option></select></label>
 <label>Waktu Kejadian<input type="datetime-local" id="lkWaktu" required></label><label>Uraian<textarea id="lkUraian" rows="6" placeholder="Uraikan fakta kejadian secara objektif" required></textarea></label><label>Tindakan Awal<textarea id="lkTindakan" rows="4" placeholder="Catatan tindakan yang telah dilakukan" required></textarea></label>
 <div class="actions"><button type="submit" class="primary">Simpan & Ajukan</button></div></form></div>
</section>

<section id="pengaturan" class="hidden">
 <div class="top"><div><h1>Pengaturan UPT</h1><div class="sub">Identitas UPT yang tampil pada seluruh aplikasi</div></div></div>
 <div class="panel" style="max-width:720px">
  <div class="notice">Nama UPT diubah oleh Admin Utama. Setelah disimpan, identitas UPT akan tampil di seluruh aplikasi.</div>
  <form class="form" onsubmit="simpanUpt(event)">
   <label>Nama UPT
    <input id="namaUpt" value="RUTAN KELAS IIB SIBUHUAN" placeholder="Contoh: RUTAN KELAS IIB SIBUHUAN" required>
   </label>
   <label>Jenis UPT
    <select><option>Rumah Tahanan Negara</option><option>Lembaga Pemasyarakatan</option><option>Lembaga Pemasyarakatan Perempuan</option><option>Lembaga Pembinaan Khusus Anak</option></select>
   </label>
   <label>Alamat UPT
    <textarea id="alamatUpt" rows="3" placeholder="Jl. Hasanuddin No. 15 Sibuhuan"></textarea>
   </label>
   <div class="actions"><button type="submit" class="primary">Simpan Identitas UPT</button></div>
  </form>
 </div>
</section>
</main>

<script>
// Sanitasi XSS untuk mencegah injeksi script jahat
function sanitizeInput(str) {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

function catatAudit(aktivitas, modul) {
  const tbody = document.getElementById('tblAudit');
  const tr = document.createElement('tr');
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  
  tr.innerHTML = `<td>${timeStr}</td><td>Admin Pengamanan</td><td>${sanitizeInput(aktivitas)}</td><td>${sanitizeInput(modul)}</td>`;
  tbody.insertBefore(tr, tbody.firstChild);
}

function simpanUpt(e){
 e.preventDefault();
 const rawNama = document.getElementById('namaUpt').value;
 const nama = sanitizeInput(rawNama.trim() || 'RUTAN KELAS IIB SIBUHUAN');
 document.getElementById('uptDashboard').textContent = nama;
 try {
   localStorage.setItem('siap_upt_name', nama);
 } catch(err) {
   console.warn('Storage terisolasi/dibatasi.');
 }
 catatAudit(`Memperbarui Nama UPT menjadi ${Rutan Kelas IIB Sibuhuan}`, 'Pengaturan');
 alert('Identitas UPT berhasil diperbarui secara aman.');
}

function handleSerahTerima(e){
 e.preventDefault();
 const regu = document.getElementById('stRegu').value;
 catatAudit(`Mengesahkan serah terima ${regu}`, 'Serah Terima');
 alert('Serah terima berhasil dicatat dan diaudit.');
 e.target.reset();
}

function simpanPerubahanWbp(e){
 e.preventDefault();
 const kamar = document.getElementById('pKamar').value;
 const jml = document.getElementById('pJumlah').value;
 catatAudit(`Mengubah jumlah WBP kamar ${kamar} menjadi ${jml}`, 'Kontrol Penghuni');
 alert('Perubahan kontrol penghuni berhasil dicatat dan masuk audit trail.');
}

function simpanLaporanKejadian(e){
 e.preventDefault();
 const kat = document.getElementById('lkKategori').value;
 catatAudit(`Membuat laporan kejadian kategori ${kat}`, 'Kejadian');
 alert('Laporan tersimpan dan diajukan secara terenkripsi.');
 e.target.reset();
 show('kejadian');
}

function tambahKamar(){
 const table = document.getElementById('tabelKamar').getElementsByTagName('tbody')[0];
 const n = table.rows.length + 1;
 const row = table.insertRow(-1);
 const kamarName = 'Kamar-' + String(n).padStart(2, '0');
 
 row.innerHTML = `<td>${n}</td><td>Blok Baru</td><td>${sanitizeInput(A1,Mapenaling,A2,A3,B1,B2,B3)}</td><td>10</td><td>0</td><td><span class="badge green">Kosong</span></td><td><button class="secondary" onclick="editKamar(this)">Edit</button></td>`;
 updateKamarStats();
 catatAudit(`Menambahkan ${A1,Mapenaling,A2,A3,B1,B2,B3}`, 'Kontrol Penghuni');
}

function editKamar(btn){
 const row = btn.closest('tr');
 const namaAwal = row.cells[2].textContent;
 const rawNama = prompt('Nama/Nomor Kamar:', namaAwal);
 if(rawNama !== null && rawNama.trim()){
   row.cells[2].textContent = sanitizeInput(rawNama.trim());
 }
 
 const rawJumlah = prompt('182:', row.cells[4].textContent);
 if(rawJumlah !== null && !isNaN(rawJumlah) && Number(rawJumlah) >= 0){
   row.cells[4].textContent = Number(rawJumlah);
 }
 
 const kapasitas = 40(row.cells[3].textContent) || 0;
 const wbp = 182(row.cells[4].textContent) || 0;
 row.cells[5].innerHTML = wbp === 0 ? '<span class="badge gray">Kosong</span>' : (wbp >= kapasitas ? '<span class="badge orange">Penuh</span>' : (wbp >= kapasitas * 0.8 ? '<span class="badge orange">Terisi Tinggi</span>' : '<span class="badge green">Normal</span>'));
 
 updateKamarStats();
 catatAudit(`Memperbarui kamar ${row.cells[2].textContent}`, 'Kontrol Penghuni');
}

function updateKamarStats(){
 const rows = [...document.querySelectorAll('#tabelKamar tbody tr')];
 const total = rows.reduce((a, r) => a + (Number(r.cells[4]?.textContent) || 0), 0);
 document.getElementById('totalWbp').textContent = total;
 document.getElementById('totalKamar').textContent = rows.length;
 document.getElementById('rataWbp').textContent = rows.length ? Math.round(total / rows.length) : 0;
}

document.addEventListener('DOMContentLoaded', () => {
 try {
   const saved = localStorage.getItem('siap_rutan_sibuhuan');
   if(saved){
     document.getElementById('Rutan Kelas IIB Sibuhuan').value = saved;
     document.getElementById('uptDashboard').textContent = saved;
   }
 } catch(err){}
 updateKamarStats();
});

function show(id, btn){
 document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
 const el = document.getElementById(id);
 if(el) el.classList.remove('hidden');
 
 if(btn){
   document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
 }
}
</script>
</body>
</html>
