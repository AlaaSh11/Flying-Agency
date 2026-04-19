import React, { useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import Btn from './Btn.jsx';

export default function Nav({ page, setPage, mode, toggleMode, t }) {
  const [sc, setSc] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const main = [{ id: 'search', l: 'Flights' }, { id: 'dashboard', l: 'Dashboard' }];
  const dark = [{ id: 'surveillance', l: 'Surveillance' }, { id: 'vip', l: 'VIP Escape' }, { id: 'chrono', l: 'ChronoTravel' }];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      background: sc ? t.navBg : 'transparent',
      backdropFilter: sc ? 'blur(28px) saturate(200%)' : 'none',
      borderBottom: sc ? `1px solid ${t.border}` : 'none',
      transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)', padding: '0 5vw'
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Logo t={t} onClick={() => setPage('home')} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {main.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} data-h style={{
              background: page === l.id ? t.badge : 'transparent', border: 'none', cursor: 'none',
              padding: '7px 15px', borderRadius: 30,
              color: page === l.id ? t.a : t.textMuted,
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: page === l.id ? 600 : 400, transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = t.a; e.currentTarget.style.background = t.badge; }}
              onMouseLeave={e => { e.currentTarget.style.color = page === l.id ? t.a : t.textMuted; e.currentTarget.style.background = page === l.id ? t.badge : 'transparent'; }}
            >{l.l}</button>
          ))}
          <div style={{ width: 1, height: 16, background: t.border, margin: '0 4px' }} />
          {dark.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} data-h style={{
              background: page === l.id ? t.badge : 'transparent', border: 'none', cursor: 'none',
              padding: '6px 13px', borderRadius: 30,
              color: page === l.id ? t.a : t.textMuted + 'aa',
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 400, transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = t.a; }}
              onMouseLeave={e => { e.currentTarget.style.color = page === l.id ? t.a : t.textMuted + 'aa'; }}
            >{l.l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <button onClick={toggleMode} data-h style={{
            background: t.badge, border: `1px solid ${t.border}`, cursor: 'none',
            width: 38, height: 38, borderRadius: '50%', color: t.a, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.transform = 'rotate(20deg) scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'none'; }}
          >{mode === 'dark' ? '✦' : '◑'}</button>
          <button onClick={() => setPage('login')} data-h style={{
            background: 'transparent', border: `1px solid ${t.border}`, cursor: 'none',
            padding: '7px 18px', borderRadius: 30, color: t.text,
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.color = t.a; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}
          >Sign In</button>
          <Btn onClick={() => setPage('register')} t={t} sm>Join ✦</Btn>
        </div>
      </div>
    </nav>
  );
}