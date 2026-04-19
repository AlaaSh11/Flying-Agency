import React, { useState } from 'react';
import Orbs from '../components/Orbs.jsx';
import Sparkles from '../components/Sparkles.jsx';
import Logo from '../components/Logo.jsx';
import Btn from '../components/Btn.jsx';

export default function LoginPage({ t, setPage }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('login');
  const [focused, setFocused] = useState(null);
  const iS = (name) => ({
    width: '100%', padding: '13px 17px', borderRadius: 13,
    background: t.inp, border: `1.5px solid ${focused === name ? t.a : t.border}`,
    color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: 'none',
    transition: 'border-color 0.3s,box-shadow 0.3s',
    boxShadow: focused === name ? `0 0 0 3px ${t.glow}` : 'none'
  });
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, transition: 'background 0.8s', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <Orbs t={t} /><Sparkles t={t} n={14} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1, animation: 'bloom 0.55s cubic-bezier(0.23,1,0.32,1) both' }}>
        <div style={{ height: 3, background: t.grad, borderRadius: '4px 4px 0 0' }} />
        <div style={{ background: t.bgCard, borderRadius: '0 0 24px 24px', padding: '38px 38px 34px', border: `1px solid ${t.border}`, borderTop: 'none', boxShadow: `0 28px 80px ${t.glow}` }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Logo t={t} onClick={() => setPage('home')} large />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.7rem', color: t.text, marginTop: 24, marginBottom: 6 }}>
              {phase === 'login' ? 'Welcome Back' : 'Verify Identity'}
            </h2>
            <p style={{ color: t.textMuted, fontSize: 13 }}>{phase === 'login' ? 'Sign in to your account' : 'Enter the 6-digit code sent to your device'}</p>
          </div>
          {phase === 'login' && (
            <form onSubmit={e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setPhase('2fa'); }, 1100); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@ctrl.elite" required
                  style={iS('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>PASSWORD</label>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••••" required
                  style={iS('pass')} onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)} />
                <div style={{ textAlign: 'right', marginTop: 8 }}>
                  <button type="button" data-h style={{ background: 'none', border: 'none', cursor: 'none', color: t.a, fontSize: 12, fontWeight: 500 }}>Forgot password?</button>
                </div>
              </div>
              <Btn t={t} full sx={{ marginTop: 4 }}>{loading ? 'Signing in…' : 'Sign In ✦'}</Btn>
            </form>
          )}
          {phase === '2fa' && (
            <form onSubmit={e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setPage('dashboard'); }, 900); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>VERIFICATION CODE</label>
                <input type="text" maxLength={6} placeholder="000000" required
                  style={{ ...iS('code'), textAlign: 'center', fontSize: 28, letterSpacing: 14, fontFamily: "'Space Mono',monospace" }}
                  onFocus={() => setFocused('code')} onBlur={() => setFocused(null)} />
              </div>
              <Btn t={t} full>{loading ? 'Verifying…' : 'Verify & Enter ✦'}</Btn>
            </form>
          )}
          <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
            <span style={{ color: t.textMuted, fontSize: 13 }}>No account? </span>
            <button onClick={() => setPage('register')} data-h style={{ background: 'none', border: 'none', cursor: 'none', color: t.a, fontSize: 13, fontWeight: 600 }}>Create one ✦</button>
          </div>
        </div>
      </div>
    </div>
  );
}