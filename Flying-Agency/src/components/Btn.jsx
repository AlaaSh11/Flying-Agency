import React, { useState, useRef } from 'react';

export default function Btn({ children, onClick, t, outlined = false, full = false, sm = false, sx = {} }) {
  const [h, setH] = useState(false);
  const [rip, setRip] = useState(null);
  const ref = useRef();
  const click = e => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setRip({ x: e.clientX - rect.left, y: e.clientY - rect.top, k: Date.now() });
      setTimeout(() => setRip(null), 700);
    }
    onClick && onClick(e);
  };
  return (
    <button ref={ref} onClick={click} data-h
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: sm ? '9px 22px' : '13px 30px', borderRadius: 50,
        border: outlined ? `1.5px solid ${t.borderH}` : 'none',
        cursor: 'none', width: full ? '100%' : 'auto', position: 'relative', overflow: 'hidden',
        background: outlined ? 'transparent' : h ? t.gradR : t.grad,
        color: outlined ? t.a : t.bg,
        fontFamily: "'DM Sans',sans-serif", fontSize: sm ? 13 : 14, fontWeight: 600,
        boxShadow: outlined ? 'none' : h ? `0 8px 32px ${t.glow},0 0 0 1px ${t.a}22` : `0 5px 22px ${t.glow}`,
        transform: h ? 'translateY(-2px) scale(1.025)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)', letterSpacing: 0.3, ...sx
      }}>
      {rip && <span key={rip.k} style={{
        position: 'absolute', left: rip.x, top: rip.y, width: 8, height: 8,
        borderRadius: '50%', background: outlined ? t.a : 'rgba(255,255,255,0.5)',
        animation: 'ripple 0.7s ease-out both', pointerEvents: 'none'
      }} />}
      {children}
    </button>
  );
}