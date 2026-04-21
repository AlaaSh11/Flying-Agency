import React, { useState, useRef, useCallback } from 'react';
import Orbs from '../components/Orbs.jsx';
import Sparkles from '../components/Sparkles.jsx';
import Pill from '../components/Pill.jsx';
import Btn from '../components/Btn.jsx';
import Logo from '../components/Logo.jsx';
import Ticker from '../components/Ticker.jsx';

import { apiClient } from '../api/client.js';

const DARK_MODULES = [
  { id: 'surveillance', icon: '◉', title: 'Surveillance Network', desc: 'Pattern analysis & anomaly detection for authorized administrators.', c: '#CC44FF', c2: '#8844FF' },
  { id: 'vip', icon: '♛', title: 'VIP Escape Service', desc: 'Identity abstraction. Confidential multi-leg routing. Zero trace.', c: '#FFD060', c2: '#FF9030' },
  { id: 'chrono', icon: '⧖', title: 'ChronoTravel™', desc: 'AR/VR time-travel through civilizations past and futures unborn.', c: '#44CCFF', c2: '#4488FF' },
];

const tags = ['All', 'Romance', 'Culture', 'Luxury', 'Adventure', 'Scenic'];

export default function HomePage({ t, setPage }) {
  const [hov, setHov] = useState(null);
  const [filter, setFilter] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef();
  const [dests, setDests] = useState([]);
  const [trending, setTrending] = useState([]);

  React.useEffect(() => {
    let mounted = true;
    apiClient('/api/v1/flights/trending').then(data => {
      if (mounted && data) setTrending(data);
    }).catch(err => console.error(err));
    return () => { mounted = false; };
  }, []);

  React.useEffect(() => {
    let mounted = true;
    const q = filter === 'All' ? '' : `?category=${filter}`;
    apiClient(`/api/v1/destinations${q}`).then(data => {
      if (mounted && data) setDests(data);
    }).catch(err => console.error(err));
    return () => { mounted = false; };
  }, [filter]);

  const handleMouseMove = useCallback(e => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  return (
    <div style={{ background: t.bg, minHeight: '100vh', color: t.text, transition: 'background 0.8s,color 0.8s' }}>
      <Orbs t={t} />

      {/* HERO */}
      <section ref={heroRef} onMouseMove={handleMouseMove}
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28,
            transform: `translate(${(mousePos.x - 0.5) * -12}px,${(mousePos.y - 0.5) * -8}px) scale(1.06)`,
            transition: 'transform 0.1s ease-out'
          }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${t.heroOv} 0%,${t.heroOv.replace('0.82', '0.5')} 50%,rgba(0,0,0,0) 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 100%,${t.o1},transparent 55%),radial-gradient(ellipse at 100% 0%,${t.o2},transparent 55%)` }} />
        <Sparkles t={t} n={20} />
        <div style={{
          position: 'absolute', left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle,${t.o1},transparent 70%)`,
          transform: 'translate(-50%,-50%)', pointerEvents: 'none', transition: 'left 0.4s ease,top 0.4s ease'
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '130px 5vw 80px', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ marginBottom: 22, animation: 'fadeUp 0.6s ease both' }}><Pill label="✦ Premium Travel Agency" t={t} lg /></div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(3.2rem,8vw,6.8rem)', lineHeight: 0.98, color: t.text, marginBottom: 4, animation: 'fadeUp 0.6s ease 0.08s both' }}>Fly in</h1>
            <h1 style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(3.2rem,8vw,6.8rem)', lineHeight: 0.98, marginBottom: 30,
              background: t.shimmer, backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'fadeUp 0.6s ease 0.16s both, shimmer 4s linear infinite'
            }}>Pure Style</h1>
            <p style={{ fontSize: '1.1rem', color: t.textMuted, maxWidth: 480, lineHeight: 1.9, marginBottom: 42, animation: 'fadeUp 0.6s ease 0.24s both' }}>
              Curated journeys for those who demand the extraordinary — from sun-drenched coasts to worlds beyond time.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.32s both' }}>
              <Btn onClick={() => setPage('search')} t={t}>Explore Flights ✦</Btn>
              <Btn onClick={() => setPage('register')} t={t} outlined>Create Account</Btn>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 44, flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.4s both' }}>
              {[{ n: '50K+', l: 'Travelers' }, { n: String(dests.length || '0'), l: 'Destinations' }, { n: '4.9★', l: 'Rating' }].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: t.badge, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: t.a }}>{b.n}</div>
                  <span style={{ fontSize: 12, color: t.textMuted }}>{b.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating glass card */}
          <div style={{
            position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-42%)',
            width: 295, background: `${t.bgCard}ee`, borderRadius: 26, padding: 26,
            border: `1px solid ${t.borderH}`, backdropFilter: 'blur(20px)',
            boxShadow: `0 24px 64px ${t.glow},0 0 0 1px ${t.a}11`,
            animation: 'floatY 10s ease-in-out infinite, fadeIn 1s 0.5s both',
          }}>
            <div style={{ height: 2, background: t.grad, borderRadius: 2, marginBottom: 20, animation: 'gradMove 3s linear infinite', backgroundSize: '200% 100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '0.9rem', color: t.text }}>Trending Now</span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: t.a, letterSpacing: 1 }}>LIVE</span>
            </div>
            {trending.length > 0 ? trending.map((d, i) => (
              <div key={d.id || i} data-h style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none', transition: 'all 0.3s', cursor: 'none' }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                <span style={{ color: t.textMuted, fontSize: 13 }}>{d.emoji || '✈️'} {d.name}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: t.a, fontWeight: 700 }}>${d.price}</span>
              </div>
            )) : <div style={{ color: t.textMuted, fontSize: 12 }}>Loading trends...</div>}
            <div data-h style={{ marginTop: 16, padding: '9px 0', borderRadius: 50, textAlign: 'center', background: t.badge, border: `1px solid ${t.border}`, color: t.a, fontSize: 12, fontWeight: 600, cursor: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = t.grad; e.currentTarget.style.color = t.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = t.badge; e.currentTarget.style.color = t.a; }}
            >View All Deals →</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', animation: 'pulse 2.5s infinite', zIndex: 2 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: t.textMuted, letterSpacing: 3, marginBottom: 7 }}>SCROLL</div>
          <div style={{ width: 1, height: 30, background: `linear-gradient(${t.a},transparent)`, margin: '0 auto' }} />
        </div>
      </section>

      <Ticker t={t} />

      {/* STATS */}
      <section style={{ padding: '70px 5vw', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {[{ n: '50,000+', l: 'Happy Travelers', icon: '✈' }, { n: String(dests.length || '0'), l: 'Destinations', icon: '🌍' }, { n: '99.8%', l: 'On-Time Rate', icon: '⏱' }, { n: '24/7', l: 'Elite Support', icon: '◎' }].map((s, i) => (
            <div key={i} data-h
              style={{ background: t.bgCard, borderRadius: 22, padding: '28px 22px', border: `1px solid ${t.cardB}`, textAlign: 'center', transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)', animation: `fadeUp 0.5s ease ${i * 0.09}s both`, position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 18px 48px ${t.glow}`; e.currentTarget.style.borderColor = t.a + '55'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = t.cardB; }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${t.o1},transparent 70%)` }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 22, marginBottom: 10, opacity: 0.7 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.2rem', fontWeight: 700, background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                <div style={{ color: t.textMuted, fontSize: 12, marginTop: 6 }}>{s.l}</div>
                <div style={{ height: 2, background: t.grad, borderRadius: 2, width: '38%', margin: '12px auto 0', opacity: 0.5, animation: 'revealLine 1.2s ease both', transformOrigin: 'left' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section style={{ padding: '40px 5vw 90px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 46, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <Pill label="Curated for You" t={t} />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', color: t.text, marginTop: 14 }}>
                Dream <em style={{ background: t.shimmer, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite' }}>Destinations</em>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <button key={tag} onClick={() => setFilter(tag)} data-h style={{
                  background: filter === tag ? t.grad : t.badge, border: filter === tag ? 'none' : `1px solid ${t.border}`,
                  cursor: 'none', padding: '7px 18px', borderRadius: 30,
                  color: filter === tag ? t.bg : t.textMuted,
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, transition: 'all 0.3s',
                  transform: filter === tag ? 'scale(1.04)' : 'none'
                }}>{tag}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))', gap: 22 }}>
            {dests.map((d, i) => (
              <div key={d.id}
                onMouseEnter={() => setHov(d.id)} onMouseLeave={() => setHov(null)}
                onClick={() => setPage('search')} data-h
                style={{
                  borderRadius: 24, overflow: 'hidden', cursor: 'none', background: t.bgCard,
                  border: `1px solid ${hov === d.id ? t.a + '88' : t.cardB}`,
                  boxShadow: hov === d.id ? `0 24px 60px ${t.glow},0 0 0 1px ${t.a}22` : 'none',
                  transform: hov === d.id ? 'translateY(-10px) scale(1.025)' : 'none',
                  transition: 'all 0.44s cubic-bezier(0.23,1,0.32,1)',
                  animation: `fadeUp 0.5s ease ${i * 0.07}s both`, position: 'relative',
                }}>
                <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                  <img src={d.image || d.img || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov === d.id ? 'scale(1.1)' : 'scale(1)', filter: hov === d.id ? 'brightness(1.05)' : 'brightness(0.92)', transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top,${t.bgCard}dd 0%,transparent 55%)` }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${t.a}22,${t.b}22)`, opacity: hov === d.id ? 1 : 0, transition: 'opacity 0.4s' }} />
                  <div style={{ position: 'absolute', top: 13, left: 13 }}>
                    <span style={{ padding: '4px 13px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, background: hov === d.id ? t.grad : t.badge, color: hov === d.id ? t.bg : t.a, fontFamily: "'Space Mono',monospace", transition: 'all 0.35s' }}>{d.category || d.tag || 'Standard'}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 13, right: 13, fontSize: 18, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>{d.emoji || '🛫'}</div>
                </div>
                <div style={{ padding: '16px 20px 22px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.2rem', color: t.text }}>{d.name}</h3>
                  <p style={{ color: t.textMuted, fontSize: 12, marginTop: 2, marginBottom: 14 }}>{d.country}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '1.22rem', fontWeight: 700, background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${d.price}</span>
                      <span style={{ color: t.textMuted, fontSize: 11 }}>/person</span>
                    </div>
                    <Btn onClick={e => { e.stopPropagation(); setPage('search'); }} t={t} sm sx={{ padding: '7px 18px', fontSize: 12 }}>Book Now</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK MODULES */}
      <section style={{ padding: '60px 5vw 90px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <Pill label="Restricted Access" t={t} />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', color: t.text, marginTop: 14 }}>
              Beyond <em>Ordinary</em> Travel
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(275px,1fr))', gap: 18 }}>
            {DARK_MODULES.map((m, i) => (
              <div key={m.id} onClick={() => setPage(m.id)} data-h
                style={{ borderRadius: 22, overflow: 'hidden', cursor: 'none', background: '#07030E', border: `1px solid ${m.c}1A`, transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)', animation: `fadeUp 0.5s ease ${i * 0.13}s both` }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${m.c}55`; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 50px ${m.c}1A`; }}
                onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${m.c}1A`; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg,${m.c},${m.c2})` }} />
                <div style={{ padding: '26px 26px 30px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 15, marginBottom: 18, background: `linear-gradient(135deg,${m.c}1A,${m.c2}1A)`, border: `1px solid ${m.c}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: m.c }}>{m.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.05rem', color: m.c, marginBottom: 9 }}>{m.title}</h3>
                  <p style={{ color: '#6B6B7B', fontSize: 12, lineHeight: 1.75, marginBottom: 18 }}>{m.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Space Mono',monospace", fontSize: 9, color: m.c, letterSpacing: 2 }}>
                    ACCESS MODULE
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${m.c}55,transparent)`, animation: 'revealLine 1.5s ease both', transformOrigin: 'left' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 5vw 28px', borderTop: `1px solid ${t.border}`, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <Logo t={t} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <p style={{ color: t.textMuted, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>
            © 2026 CTRL ELITE · CS 490 Dr. Haraty · Team CTRL ELITE
          </p>
        </div>
      </footer>
    </div>
  );
}