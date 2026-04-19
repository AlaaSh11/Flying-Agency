import React, { useState } from 'react';

export default function Logo({ t, onClick, large = false }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} data-h
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'none', userSelect: 'none', transition: 'transform 0.3s', transform: h ? 'scale(1.03)' : 'none' }}>
      <div style={{
        width: large ? 50 : 36, height: large ? 50 : 36, borderRadius: large ? 15 : 11,
        background: h ? t.gradR : t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 18px ${t.glow}`, flexShrink: 0, transition: 'all 0.4s',
        animation: large ? 'glowBreath 3s ease-in-out infinite' : 'none'
      }}>
        <svg width={large ? 24 : 18} height={large ? 24 : 18} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="white" opacity="0.82" />
          <circle cx="12" cy="12" r="3.2" fill="white" />
          <path d="M12 7v1.5M12 15.5V17M7 12h1.5M15.5 12H17" stroke="white" strokeWidth="1.3" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: large ? 11 : 9, letterSpacing: 3.5, color: t.a, lineHeight: 1, textTransform: 'uppercase', transition: 'color 0.4s' }}>CTRL</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: large ? 21 : 16, color: t.text, lineHeight: 1, marginTop: 1, letterSpacing: 0.3, transition: 'color 0.4s' }}>ELITE</div>
      </div>
    </div>
  );
}