import React, { useMemo } from 'react';

export default function StarField({ n = 60 }) {
  const pts = useMemo(() => Array.from({ length: n }, () => ({
    l: `${Math.random() * 100}%`, t: `${Math.random() * 100}%`,
    s: Math.random() * 2 + 0.4, d: `${Math.random() * 6}s`, dur: `${Math.random() * 4 + 2}s`
  })), [n]);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {pts.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.l, top: p.t, width: p.s, height: p.s,
          borderRadius: '50%', background: '#fff', opacity: 0,
          animation: `twinkle ${p.dur} ease-in-out infinite`, animationDelay: p.d
        }} />
      ))}
    </div>
  );
}