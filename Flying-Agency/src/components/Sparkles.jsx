import React, { useMemo } from 'react';

export default function Sparkles({ t, n = 14 }) {
  const pts = useMemo(() => Array.from({ length: n }, () => ({
    l: `${8 + Math.random() * 84}%`, t: `${4 + Math.random() * 92}%`,
    s: Math.random() * 8 + 3, d: `${Math.random() * 5}s`, dur: `${Math.random() * 3 + 2}s`
  })), [n]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pts.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.l, top: p.t,
          animation: `twinkle ${p.dur} ease-in-out infinite`, animationDelay: p.d
        }}>
          <svg viewBox="0 0 20 20" width={p.s} height={p.s} fill={t.a} opacity="0.75">
            <path d="M10 1l1.8 6.2H18l-5.2 3.8 2 6.2L10 14l-4.8 3.2 2-6.2L2 7.2h6.2z" />
          </svg>
        </div>
      ))}
    </div>
  );
}