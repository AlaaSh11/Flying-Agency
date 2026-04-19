import React, { useState } from 'react';
import Orbs from '../components/Orbs.jsx';
import Pill from '../components/Pill.jsx';

const bookings = [
  { id: 'BK-2041', route: 'BEY → DXB', date: 'Apr 22, 2026', airline: 'Emirates', status: 'Confirmed', price: 340, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=70' },
  { id: 'BK-2038', route: 'BEY → CDG', date: 'May 05, 2026', airline: 'Air France', status: 'Upcoming', price: 680, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70' },
  { id: 'BK-2029', route: 'IST → BEY', date: 'Mar 12, 2026', airline: 'Turkish Airlines', status: 'Completed', price: 290, img: 'https://images.unsplash.com/photo-1558618047-f4e75d5b1d5c?w=400&q=70' },
];
const sC = { Confirmed: '#55CC88', Upcoming: '#BB88FF', Completed: '#9090A0' };

export default function DashboardPage({ t }) {
  const [tab, setTab] = useState('bookings');
  const [hovRow, setHovRow] = useState(null);
  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingTop: 90, paddingBottom: 80, transition: 'background 0.8s', position: 'relative' }}>
      <Orbs t={t} />
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 5vw', position: 'relative', zIndex: 1 }}>

        {/* Profile banner */}
        <div style={{ background: t.bgCard, borderRadius: 24, padding: 26, border: `1px solid ${t.border}`, marginBottom: 22, overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle,${t.o1},transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 3, right: 0, background: t.grad, opacity: 0.4 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', position: 'relative' }}>
            <div style={{ width: 68, height: 68, borderRadius: 22, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: t.bg, fontFamily: "'Playfair Display',serif", fontWeight: 700, boxShadow: `0 8px 26px ${t.glow}`, flexShrink: 0, animation: 'glowBreath 3s ease-in-out infinite' }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 5 }}><Pill label="Gold Member ✦" t={t} /></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.45rem', color: t.text }}>Adam Dayekh</h2>
              <p style={{ color: t.textMuted, fontSize: 12, marginTop: 3 }}>adam@ctrlelite.com · Member since 2025</p>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[{ n: '3', l: 'Bookings' }, { n: '12.4K', l: 'Miles' }, { n: 'Gold', l: 'Tier' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.45rem', background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                  <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 22, background: t.bgCard, borderRadius: 15, padding: 5, border: `1px solid ${t.border}`, width: 'fit-content' }}>
          {[{ id: 'bookings', l: 'My Bookings' }, { id: 'upcoming', l: 'Upcoming' }, { id: 'export', l: 'Export' }].map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)} data-h style={{
              background: tab === tb.id ? t.grad : 'transparent', border: 'none', cursor: 'none', padding: '8px 20px', borderRadius: 11,
              color: tab === tb.id ? t.bg : t.textMuted,
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 0.3s',
              boxShadow: tab === tb.id ? `0 4px 16px ${t.glow}` : 'none'
            }}>{tb.l}</button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.4s ease both' }}>
            {bookings.map((b, i) => (
              <div key={i} data-h
                style={{ background: t.bgCard, borderRadius: 20, overflow: 'hidden', border: `1px solid ${hovRow === i ? t.a + '55' : t.cardB}`, display: 'grid', gridTemplateColumns: 'auto 1fr auto', animation: `slideL 0.4s ease ${i * 0.09}s both`, transform: hovRow === i ? 'translateX(5px)' : 'none', transition: 'all 0.32s cubic-bezier(0.23,1,0.32,1)', boxShadow: hovRow === i ? `0 8px 28px ${t.glow}` : 'none' }}
                onMouseEnter={() => setHovRow(i)} onMouseLeave={() => setHovRow(null)}>
                <img src={b.img} alt="" style={{ width: 110, objectFit: 'cover', transition: 'filter 0.3s', filter: hovRow === i ? 'saturate(0.85)' : 'saturate(0.55)' }} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 5 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.05rem', color: t.text }}>{b.route}</h3>
                    <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 9, fontWeight: 700, background: `${sC[b.status]}1A`, color: sC[b.status], fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{b.status}</span>
                  </div>
                  <p style={{ color: t.textMuted, fontSize: 12 }}>{b.airline} · {b.date}</p>
                  <p style={{ color: t.textMuted, fontSize: 10, marginTop: 3, fontFamily: "'Space Mono',monospace" }}>{b.id}</p>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 9 }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: '1.15rem', background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${b.price}</div>
                  <button data-h style={{ background: 'transparent', border: `1px solid ${t.border}`, cursor: 'none', padding: '5px 13px', borderRadius: 9, color: t.textMuted, fontSize: 11, transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.color = t.a; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}>Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'upcoming' && (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, textAlign: 'center', animation: 'fadeUp 0.4s ease both', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${t.o1},transparent 60%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✈️</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.4rem', color: t.text, marginBottom: 7 }}>Next Flight: BEY → DXB</h3>
              <p style={{ color: t.textMuted, marginBottom: 24, fontSize: 13 }}>April 22, 2026 · Emirates EK 401 · 08:30</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {[{ l: 'Days Until', n: '6' }, { l: 'Check-in Opens', n: '48h' }, { l: 'Your Seat', n: '14A' }].map((s, i) => (
                  <div key={i} style={{ background: t.bgCard2, borderRadius: 14, padding: '18px', transition: 'all 0.3s' }}
                    data-h onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${t.glow}`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                    <div style={{ color: t.textMuted, fontSize: 11, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'export' && (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, animation: 'fadeUp 0.4s ease both' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.25rem', color: t.text, marginBottom: 7 }}>Export Your Data</h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 22 }}>Download bookings, invoices, and travel history.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 13 }}>
              {[{ f: 'PDF Report', i: '📄', d: 'Full history as PDF' }, { f: 'CSV Export', i: '📊', d: 'Spreadsheet-ready data' }, { f: 'JSON Data', i: '{ }', d: 'Raw data for developers' }, { f: 'Email Summary', i: '✉', d: 'Send to your inbox' }].map((e, i) => (
                <div key={i} data-h style={{ background: t.bgCard2, borderRadius: 13, padding: '16px 18px', cursor: 'none', border: `1px solid ${t.border}`, transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 13 }}
                  onMouseEnter={ev => { ev.currentTarget.style.borderColor = t.a + '55'; ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = `0 8px 24px ${t.glow}`; }}
                  onMouseLeave={ev => { ev.currentTarget.style.borderColor = t.border; ev.currentTarget.style.transform = 'none'; ev.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: t.badge, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{e.i}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: t.text, fontSize: 13 }}>{e.f}</div>
                    <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{e.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}