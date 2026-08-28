/* Design: Arsip Cahaya — contemporary editorial minimalism, ivory paper, charcoal ink, terracotta rose, hairline rules, tactile imagery, quiet motion. */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Check, Copy, ExternalLink, Heart, Instagram, MapPin, Music2, Pause, Play, Quote, X } from "lucide-react";

const emblemSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M23 72 C23 43 39 24 50 24 C61 24 77 43 77 72' fill='none' stroke='%23b76557' stroke-width='3'/%3E%3Cpath d='M77 72 C77 43 61 24 50 24 C39 24 23 43 23 72' fill='none' stroke='%23b76557' stroke-width='3'/%3E%3Ccircle cx='50' cy='24' r='4' fill='%23b76557'/%3E%3C/svg%3E";

const config = {
  couple: "Alya & Raka",
  initials: "A / R",
  nicknames: "Alya & Raka",
  parents: "Bapak & Ibu Pranoto · Bapak & Ibu Mahendra",
  eventDate: "2026-11-21T10:00:00+07:00",
  displayDate: "Sabtu, 21 November 2026",
  akadTime: "10.00 WIB",
  receptionTime: "12.00–15.00 WIB",
  venue: "The Garden House",
  address: "Jl. Kemang Timur No. 18, Jakarta Selatan",
  mapsUrl: "https://maps.google.com/?q=The+Garden+House+Jakarta",
  musicUrl: "",
  walletProvider: "DANA",
  walletNumber: "0812 3456 7890",
  bank: "BCA",
  accountNumber: "1234567890",
  recipient: "Alya Pranoto",
};

const gallery = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan berjalan berdampingan di bawah cahaya sore", caption: "01 — langkah pertama" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", alt: "Detail tangan pasangan dengan suasana hangat", caption: "02 — ruang yang sama" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan tersenyum di suasana alam terbuka", caption: "03 — hari yang ringan" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85", alt: "Momen intim pasangan dengan latar dedaunan", caption: "04 — dekat" },
  { src: "https://images.unsplash.com/photo-1460364157752-926555421a7e?auto=format&fit=crop&w=1200&q=85", alt: "Bunga pernikahan bernuansa putih dan hangat", caption: "05 — detail kecil" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85", alt: "Ruang acara dengan dekorasi bunga minimal", caption: "06 — tempat pulang" },
];

type Guest = { name: string; status: string; message: string; time: string };

function getGuestName() {
  const value = new URLSearchParams(window.location.search).get("to")?.trim().replace(/\s+/g, " ");
  return value ? value.slice(0, 80) : "Tamu undangan";
}

function qrUrl() { return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${config.walletProvider}:${config.walletNumber.replace(/\s/g, "")}`)}`; }

function calendarUrl() {
  const start = "20261121T030000Z";
  const end = "20261121T080000Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${config.couple}`)}&dates=${start}/${end}&details=${encodeURIComponent("Dengan hangat, kami mengundang Anda untuk hadir dan menjadi bagian dari hari kami.")}&location=${encodeURIComponent(config.address)}&ctz=Asia/Jakarta`;
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { items.forEach((item) => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function SectionIntro({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div className="section-intro" data-reveal><span className="section-number">{number}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [guests, setGuests] = useState<Guest[]>(() => JSON.parse(localStorage.getItem("arsip-cahaya-guests") || "[]"));
  const [form, setForm] = useState({ name: "", status: "Saya akan hadir", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useReveal();
  const guestName = useMemo(getGuestName, []);
  const [remaining, setRemaining] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => { const tick = () => { const delta = Math.max(0, new Date(config.eventDate).getTime() - Date.now()); setRemaining({ d: Math.floor(delta / 86400000), h: Math.floor(delta / 3600000) % 24, m: Math.floor(delta / 60000) % 60, s: Math.floor(delta / 1000) % 60 }); }; tick(); const timer = window.setInterval(tick, 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { document.body.style.overflow = lightbox !== null ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [lightbox]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (lightbox === null) return; if (event.key === "Escape") setLightbox(null); if (event.key === "ArrowRight") setLightbox((lightbox + 1) % gallery.length); if (event.key === "ArrowLeft") setLightbox((lightbox - 1 + gallery.length) % gallery.length); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [lightbox]);

  const openInvite = async () => { setOpened(true); if (audioRef.current && config.musicUrl) { audioRef.current.volume = 0.25; try { await audioRef.current.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); } } };
  const toggleMusic = async () => { if (!audioRef.current || !config.musicUrl) return; if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false); } else { try { await audioRef.current.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); } } };
  const submitRsvp = (event: React.FormEvent) => { event.preventDefault(); if (!form.name.trim() || !form.message.trim()) return; const next = [...guests, { ...form, name: form.name.trim(), message: form.message.trim(), time: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) }]; setGuests(next); localStorage.setItem("arsip-cahaya-guests", JSON.stringify(next)); setSubmitted(true); setForm({ name: "", status: "Saya akan hadir", message: "" }); };
  const copy = async (text: string, target: HTMLButtonElement) => { try { await navigator.clipboard.writeText(text.replace(/\s/g, "")); } catch { const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); } const original = target.innerHTML; target.innerHTML = '<span>Tersalin</span>'; window.setTimeout(() => { target.innerHTML = original; }, 2000); };

  return <div className={`invitation ${opened ? "is-open" : ""}`}>
    <audio ref={audioRef} src={config.musicUrl || undefined} loop />
    <div className="cover" aria-hidden={opened}><div className="cover-image" /><div className="cover-wash" /><div className="cover-content"><img className="emblem emblem-light" src={emblemSrc} alt="Emblem Alya dan Raka" /><p className="eyebrow light">Sebuah undangan personal</p><p className="cover-to">Untuk <strong>{guestName}</strong></p><h1>{config.couple}</h1><p className="cover-date">{config.displayDate}</p><button className="button button-light" onClick={openInvite}>Buka undangan <ArrowDown size={15} /></button></div><span className="cover-index">AR / 01</span></div>
    <header className="site-header"><a href="#top" className="brand"><img src={emblemSrc} alt="" /> <span>{config.initials}</span></a><nav><a href="#story">Cerita</a><a href="#details">Detail acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Tanda kasih</a></nav><span className="header-date">21—11—26</span></header>
    <main id="top">
      <section className="hero section-pad"><div className="hero-copy" data-reveal><p className="eyebrow">Catatan pertama · 2026</p><h1>Satu halaman baru,<br /><em>ditulis berdua.</em></h1><p className="hero-lede">Dengan penuh syukur, kami mengundang Anda untuk hadir dalam hari yang kami simpan baik-baik.</p><a className="text-link" href="#story">Baca cerita kami <ArrowDown size={15} /></a></div><div className="hero-art" data-reveal><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=88" alt="Tangan pasangan di atas kertas undangan" /></div><span className="hero-note">Alya · Raka<br />Jakarta, Indonesia</span></section>
      <section id="story" className="story section-pad"><SectionIntro number="01" eyebrow="Dari halaman yang sama" title="Cerita kami" /><div className="story-grid"><div className="story-quote" data-reveal><Quote size={24} /><p>“Kami bertemu di antara percakapan yang tidak direncanakan, lalu menemukan bahwa pulang bisa berarti duduk di sebelah orang yang sama.”</p></div><div className="story-copy" data-reveal><p>Awalnya hanya dua orang yang berbagi meja dan daftar lagu. Dari sana, hari-hari tumbuh menjadi perjalanan kecil: kopi pagi, kota-kota baru, dan keberanian untuk memilih satu sama lain.</p><p>Di hari yang akan datang, kami ingin membuka halaman berikutnya bersama orang-orang yang membuat perjalanan ini terasa lengkap.</p><span className="signature">Alya & Raka</span></div></div><img className="stilllife" src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=88" alt="Still life kertas, linen, dan kotak cincin" /></section>
      <section id="details" className="details section-pad"><SectionIntro number="02" eyebrow="Tandai kalendermu" title="Hari yang kami tunggu" /><div className="date-banner" data-reveal><span>{config.displayDate}</span><strong>21·11·26</strong></div><div className="event-grid"><article data-reveal><span className="event-label">Akad nikah</span><h3>{config.akadTime}</h3><p>{config.venue}<br />{config.address}</p><a className="text-link" href={config.mapsUrl} target="_blank" rel="noreferrer">Lihat lokasi <ExternalLink size={14} /></a></article><article data-reveal><span className="event-label">Resepsi</span><h3>{config.receptionTime}</h3><p>{config.venue}<br />{config.address}</p><a className="text-link" href={calendarUrl()} target="_blank" rel="noreferrer">Simpan ke Google Calendar <CalendarDays size={14} /></a></article></div><div className="countdown" data-reveal>{[[remaining.d, "hari"], [remaining.h, "jam"], [remaining.m, "menit"], [remaining.s, "detik"]].map(([value, label]) => <div key={label as string}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></section>
      <section id="gallery" className="gallery-section section-pad"><SectionIntro number="03" eyebrow="Enam fragmen kecil" title="Yang ingin kami ingat" /><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-item item-${index + 1}`} key={item.src} onClick={() => setLightbox(index)} aria-label={`Lihat foto ${index + 1}`} data-reveal><img src={item.src} alt={item.alt} /><span>{item.caption}</span></button>)}</div></section>
      <section id="rsvp" className="rsvp section-pad"><SectionIntro number="04" eyebrow="Satu baris dari kamu" title="Konfirmasi kehadiran" /><div className="rsvp-grid"><form onSubmit={submitRsvp} data-reveal><label htmlFor="name">Nama lengkap</label><input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tulis namamu" required /><fieldset><legend>Status kehadiran</legend>{["Saya akan hadir", "Belum bisa memastikan", "Tidak dapat hadir"].map((status) => <label className="radio" key={status}><input type="radio" name="status" checked={form.status === status} onChange={() => setForm({ ...form, status })} /><span>{status}</span></label>)}</fieldset><label htmlFor="message">Pesan ucapan</label><textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tinggalkan satu kalimat untuk kami bawa pulang" required /><button className="button button-dark" type="submit">Kirim konfirmasi <ArrowRight size={15} /></button>{submitted && <p className="success"><Check size={15} /> Terima kasih, pesanmu sudah ditambahkan.</p>}</form><div className="guestbook" data-reveal><p className="eyebrow">Buku tamu</p>{guests.length === 0 ? <p className="empty">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : guests.map((guest, index) => <article key={`${guest.name}-${index}`}><div><strong>{guest.name}</strong><span>{guest.status} · {guest.time}</span></div><p>{guest.message}</p></article>)}</div></div></section>
      <section id="gift" className="gift section-pad"><SectionIntro number="05" eyebrow="Jika ingin berbagi lebih jauh" title="Tanda kasih" /><div className="gift-grid"><div className="gift-copy" data-reveal><p>Doa dan kehadiranmu adalah hadiah yang paling berarti. Namun jika ingin mengirim tanda kasih, berikut detail yang bisa digunakan.</p><div className="payment-row"><div className="qr-placeholder"><img src={qrUrl()} alt={`QR code ${config.walletProvider} ${config.walletNumber}`} /><small>Scan untuk mengirim</small></div><div><span className="event-label">E-wallet</span><h3>{config.walletProvider}</h3><p>{config.walletNumber}<br />a.n. {config.recipient}</p><button className="copy-button" onClick={(e) => copy(config.walletNumber, e.currentTarget)}><Copy size={14} /> Salin nomor e-wallet</button></div></div><div className="payment-row bank"><div className="bank-mark">{config.bank}</div><div><span className="event-label">Rekening bank</span><h3>{config.bank}</h3><p>{config.accountNumber}<br />a.n. {config.recipient}</p><button className="copy-button" onClick={(e) => copy(config.accountNumber, e.currentTarget)}><Copy size={14} /> Salin nomor rekening</button></div></div></div><img className="gift-art" src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=88" alt="Pasangan berjalan di antara rerumputan" data-reveal /></div></section>
    </main>
    <footer><img src={emblemSrc} alt="" /><p>Dengan hangat,<br /><em>Alya & Raka</em></p><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a></footer>
    <button className="music-button" onClick={toggleMusic} aria-label={musicPlaying ? "Jeda musik" : "Putar musik"}>{musicPlaying ? <Pause size={16} /> : <Music2 size={16} />}</button>
    <nav className="mobile-nav"><a href="#story">Cerita</a><a href="#details">Acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Kasih</a></nav>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label="Foto sebelumnya"><ArrowLeft /></button><figure onClick={(e) => e.stopPropagation()}><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} /><figcaption>{gallery[lightbox].caption}</figcaption></figure><button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label="Foto berikutnya"><ArrowRight /></button></div>}
  </div>;
}
