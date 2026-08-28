# Arah Desain Undangan Digital

## Tiga Pendekatan Awal

### Pendekatan 1
- **Theme Name:** Sagara Senja
- **Very Brief Intro:** Editorial coastal romance dengan palet biru tinta, pasir hangat, dan aksen tembaga. Terasa intim, tenang, dan dewasa tanpa menjadi desain pantai yang literal.
- **Probability:** 0.07

### Pendekatan 2
- **Theme Name:** Arsip Cahaya
- **Very Brief Intro:** Minimalisme arsip dengan kertas gading, serif klasik, garis tipis, dan komposisi seperti halaman majalah lama. Nuansanya personal, tactile, dan timeless.
- **Probability:** 0.03

### Pendekatan 3
- **Theme Name:** Taman Tengah Malam
- **Very Brief Intro:** Dark romantic dengan hijau botani, marun, dan kilau kuningan. Dramatis dan puitis, namun tetap editorial dan tidak bergantung pada efek neon.
- **Probability:** 0.09

## Pendekatan Terpilih: Arsip Cahaya

### Design Movement
Contemporary editorial minimalism dengan pengaruh Swiss print, wedding stationery letterpress, dan still-life fotografi analog.

### Core Principles
1. **Editorial, bukan template:** gunakan alignment asimetris, kolom catatan, nomor section, dan ritme seperti spread majalah.
2. **Tactile restraint:** tekstur kertas, garis hairline, dan bayangan lembut memberi kedalaman tanpa dekorasi berlebihan.
3. **Warm intimacy:** teks dan detail personal menjadi pusat pengalaman, bukan ornamen.
4. **Quiet motion:** animasi pendek, lambat, dan terarah; setiap transisi terasa seperti membalik halaman.

### Color Philosophy
Ivory parchment menjadi dasar agar layar terasa seperti kertas undangan yang disentuh. Charcoal ink menjaga keterbacaan, sementara terracotta rose menjadi signature color yang terasa manusiawi dan hangat. Brass muted hanya muncul sebagai aksen kecil, seperti foil stamping yang tidak berteriak.

### Layout Paradigm
Satu kolom naratif yang bergeser di antara rail kiri dan kanan. Desktop memakai komposisi editorial dengan nomor section, catatan margin, dan foto yang keluar sedikit dari baseline. Mobile mempertahankan urutan narasi melalui garis vertikal dan sticky bottom navigation, bukan kartu-kartu seragam.

### Signature Elements
- Nomor section besar berformat dua digit dengan garis hairline.
- Motif cap lingkaran kecil berbentuk dua busur yang saling bertemu.
- Label metadata bergaya arsip: tanggal, tempat, dan catatan pendek dalam huruf kapital kecil.

### Interaction Philosophy
Interaksi terasa seperti membuka arsip personal: tombol memakai label konkret, hover hanya menggeser garis atau mengubah tinta, dan feedback RSVP muncul sebagai catatan yang baru ditambahkan ke halaman.

### Animation
Cover slide-up selama 700ms menggunakan cubic-bezier yang tenang. Header dan konten muncul bertahap dalam interval 50ms. Foto masuk dengan opacity, translateY, dan scale ringan. Lightbox fade-in sekitar 220ms. Semua motion non-esensial mati pada prefers-reduced-motion.

### Typography System
Display memakai **Cormorant Garamond** dengan italic pada nama pasangan dan heading utama. Body memakai **DM Sans** untuk keterbacaan modern; metadata memakai DM Sans 11–12px dengan letter-spacing 0.16em. Hierarki dibangun dengan kontras ukuran dan ruang, bukan bold berlebihan.

### Brand Essence
Undangan editorial yang menyimpan kisah dua orang dalam bentuk arsip visual yang hangat, untuk tamu yang ingin merasa diundang secara personal.

Personality: **intimate, composed, tactile**.

### Brand Voice
Headline, CTA, dan microcopy terdengar hangat, singkat, dan spesifik; tidak memakai filler generik.

- “Satu halaman baru, ditulis berdua.”
- “Tinggalkan satu kalimat untuk kami bawa pulang.”

### Wordmark & Logo
Emblem tanpa teks berupa dua kurung tipis yang saling berhadapan dan bertemu pada satu titik kecil, melambangkan dua arsip yang menjadi satu cerita. Wordmark, bila dibutuhkan, memakai inisial pasangan dengan Cormorant Garamond italic dan tracking rapat.

### Signature Brand Color
**Terracotta Rose — #B76557**, warna tanah liat kemerahan yang memberi rasa hangat, dewasa, dan mudah dikenali di antara ivory dan charcoal.

## Style Decisions

- Aset hero yang gagal dimuat diganti dengan foto fallback bernuansa botani dan cahaya analog agar tidak ada placeholder rusak pada tampilan produksi.
- Emblem dua busur dipertahankan sebagai seal utama melalui SVG ringan yang dipakai pada cover, header, footer, dan favicon; monogram A/R hanya menjadi pendamping.
- Terracotta Rose `#B76557` dipakai untuk nomor section, metadata, quote, garis aksen, dan aksi utama; bidang lain tetap ivory, charcoal, dan muted brass.
- Navigasi mobile tetap berupa bottom navigation agar cover dan konten dapat dipakai dengan nyaman pada layar sempit.
