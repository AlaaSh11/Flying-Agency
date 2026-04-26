import React, { useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import Btn from './Btn.jsx';

export default function Nav({ page, setPage, mode, toggleMode, t }) {
  const [sc, setSc] = useState(false);
  const [menu, setMenu] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const main = [{ id: 'search', l: 'Flights' }, { id: 'dashboard', l: 'Dashboard' }];
  const dark = [{ id: 'surveillance', l: 'Surveillance' }, { id: 'vip', l: 'VIP Escape' }, { id: 'chrono', l: 'ChronoTravel' }];

  const handleNav = (p) => {
    setPage(p);
    setMenu(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: sc || menu ? t.navBg : 'transparent',
      backdropFilter: sc || menu ? 'blur(28px) saturate(200%)' : 'none',
      borderBottom: sc || menu ? `1px solid ${t.border}` : 'none',
      transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)', padding: '0 5vw'
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Logo t={t} onClick={() => handleNav('home')} />

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {main.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)} data-h style={{
              background: page === l.id ? t.badge : 'transparent', border: 'none', cursor: 'none',
              padding: '7px 15px', borderRadius: 30,
              color: page === l.id ? t.a : t.textMuted,
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: page === l.id ? 600 : 400, transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = t.a; e.currentTarget.style.background = t.badge; }}
              onMouseLeave={e => { e.currentTarget.style.color = page === l.id ? t.a : t.textMuted; e.currentTarget.style.background = page === l.id ? t.badge : 'transparent'; }}
            >{l.l}</button>
          ))}
          <div style={{ width: 1, height: 16, background: t.border, margin: '0 4px' }} className="nav-divider" />
          {dark.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)} data-h style={{
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

          <div className="nav-auth" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            {!isAuthenticated ? (
              <>
                <button onClick={() => handleNav('login')} data-h style={{
                  background: 'transparent', border: `1px solid ${t.border}`, cursor: 'none',
                  padding: '7px 18px', borderRadius: 30, color: t.text,
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 0.3s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.color = t.a; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}
                >Sign In</button>
                <Btn onClick={() => handleNav('register')} t={t} sm sx={{ className: 'nav-join-btn' }}>Join ✦</Btn>
              </>
            ) : (
              <button onClick={() => {
                localStorage.removeItem('token');
                handleNav('login');
              }} data-h style={{
                background: 'transparent', border: `1px solid ${t.border}`, cursor: 'none',
                padding: '7px 18px', borderRadius: 30, color: '#FF3366',
                fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 0.3s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3366'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; }}
              >Logout</button>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button onClick={() => setMenu(!menu)} className="nav-mobile-toggle" style={{
            background: 'none', border: 'none', color: t.text, fontSize: 24, padding: 0, marginLeft: 8, display: 'none'
          }}>
            {menu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menu && (
        <div style={{
          position: 'absolute', top: 70, left: 0, right: 0, background: t.navBg,
          backdropFilter: 'blur(32px)', borderBottom: `1px solid ${t.border}`,
          padding: '20px 5vw 40px', display: 'flex', flexDirection: 'column', gap: 12,
          animation: 'slideD 0.4s ease both'
        }}>
          {[...main, ...dark].map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)} style={{
              textAlign: 'left', background: 'none', border: 'none', padding: '12px 16px',
              borderRadius: 12, color: page === l.id ? t.a : t.text, fontSize: 16, fontWeight: 500
            }}>
              {l.l}
            </button>
          ))}
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <Btn onClick={() => handleNav('login')} t={t} outlined full>Sign In</Btn>
              <Btn onClick={() => handleNav('register')} t={t} full>Join ✦</Btn>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .nav-links, .nav-divider, .nav-auth { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
        @keyframes slideD {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}