import React, { useState } from 'react';
import Orbs from '../components/Orbs.jsx';
import Sparkles from '../components/Sparkles.jsx';
import Logo from '../components/Logo.jsx';
import Btn from '../components/Btn.jsx';

export default function RegisterPage({ t, setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', role: 'traveler', phone: '', pass: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const iS = (name) => ({
    width: '100%', padding: '13px 17px', borderRadius: 13,
    background: t.inp, border: `1.5px solid ${focused === name ? t.a : t.border}`,
    color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: 'none',
    transition: 'border-color 0.3s,box-shadow 0.3s',
    boxShadow: focused === name ? `0 0 0 3px ${t.glow}` : 'none'
  });
  const steps = ['Personal', 'Security', 'Ready!'];
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, transition: 'background 0.8s', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <Orbs t={t} /><Sparkles t={t} n={14} />
      <div style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1, animation: 'bloom 0.55s cubic-bezier(0.23,1,0.32,1) both' }}>
        <div style={{ height: 3, background: t.grad, borderRadius: '4px 4px 0 0' }} />
        <div style={{ background: t.bgCard, borderRadius: '0 0 24px 24px', padding: '38px 38px 34px', border: `1px solid ${t.border}`, borderTop: 'none', boxShadow: `0 28px 80px ${t.glow}` }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Logo t={t} onClick={() => setPage('home')} large />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.7rem', color: t.text, marginTop: 24, marginBottom: 22 }}>Create Account</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step > i + 1 ? t.grad : step === i + 1 ? t.grad : t.badge,
                      border: step >= i + 1 ? 'none' : `1px solid ${t.border}`,
                      color: step >= i + 1 ? t.bg : t.textMuted,
                      fontSize: 12, fontWeight: 700, transition: 'all 0.5s',
                      boxShadow: step === i + 1 ? `0 4px 16px ${t.glow}` : 'none'
                    }}>{step > i + 1 ? '✓' : i + 1}</div>
                    <div style={{ fontSize: 9, color: step >= i + 1 ? t.a : t.textMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{s.toUpperCase()}</div>
                  </div>
                  {i < steps.length - 1 && <div style={{ width: 38, height: 1, background: step > i + 1 ? t.a : t.border, margin: '0 4px 18px', transition: 'background 0.5s' }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'slideR 0.35s ease both' }}>
              {[{ l: 'FULL NAME', k: 'name', p: 'Your full name', ty: 'text' }, { l: 'EMAIL', k: 'email', p: 'you@ctrl.elite', ty: 'email' }].map(f => (
                <div key={f.k}>
                  <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>{f.l}</label>
                  <input type={f.ty} value={form[f.k]} onChange={e => u(f.k, e.target.value)} placeholder={f.p}
                    style={iS(f.k)} onFocus={() => setFocused(f.k)} onBlur={() => setFocused(null)} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>I AM A</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[{ v: 'traveler', e: '🧳', l: 'Traveler' }, { v: 'agent', e: '✈', l: 'Travel Agent' }].map(r => (
                    <div key={r.v} onClick={() => u('role', r.v)} data-h style={{
                      padding: '13px', borderRadius: 13, cursor: 'none', textAlign: 'center',
                      background: form.role === r.v ? t.badge : t.inp,
                      border: `2px solid ${form.role === r.v ? t.a : t.border}`,
                      color: form.role === r.v ? t.a : t.textMuted,
                      fontWeight: 600, fontSize: 13, transition: 'all 0.3s',
                      boxShadow: form.role === r.v ? `0 0 0 3px ${t.glow}` : 'none'
                    }}>{r.e} {r.l}</div>
                  ))}
                </div>
              </div>
              <Btn onClick={() => setStep(2)} t={t} full sx={{ marginTop: 4 }}>Continue ✦</Btn>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'slideR 0.35s ease both' }}>
              {[{ l: 'PHONE', k: 'phone', p: '+1 555 000 0000', ty: 'tel' }, { l: 'PASSWORD', k: 'pass', p: 'Min. 8 characters', ty: 'password' }, { l: 'CONFIRM PASSWORD', k: 'confirm', p: 'Repeat password', ty: 'password' }].map(f => (
                <div key={f.k}>
                  <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>{f.l}</label>
                  <input type={f.ty} value={form[f.k]} onChange={e => u(f.k, e.target.value)} placeholder={f.p}
                    style={iS(f.k)} onFocus={() => setFocused(f.k)} onBlur={() => setFocused(null)} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginTop: 4 }}>
                <Btn onClick={() => setStep(1)} t={t} outlined full sm>← Back</Btn>
                <Btn onClick={() => setStep(3)} t={t} full>Continue ✦</Btn>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ textAlign: 'center', animation: 'bloom 0.5s ease both', position: 'relative', padding: '10px 0' }}>
              <Sparkles t={t} n={10} />
              <div style={{ width: 76, height: 76, borderRadius: 22, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 30, boxShadow: `0 10px 40px ${t.glow}`, color: t.bg, animation: 'popIn 0.5s cubic-bezier(0.23,1,0.32,1) both' }}>✦</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.5rem', color: t.text, marginBottom: 9 }}>
                Ready, {form.name || 'Traveler'}!
              </h3>
              <p style={{ color: t.textMuted, lineHeight: 1.8, marginBottom: 28, fontSize: 13 }}>Your elite account is configured. Time to explore the world in pure style.</p>
              <Btn onClick={() => { setLoading(true); setTimeout(() => setPage('dashboard'), 1000); }} t={t} full>
                {loading ? 'Launching…' : '🚀 Start Exploring'}
              </Btn>
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{ color: t.textMuted, fontSize: 13 }}>Have an account? </span>
            <button onClick={() => setPage('login')} data-h style={{ background: 'none', border: 'none', cursor: 'none', color: t.a, fontSize: 13, fontWeight: 600 }}>Sign in ✦</button>
          </div>
        </div>
      </div>
    </div>
  );
}