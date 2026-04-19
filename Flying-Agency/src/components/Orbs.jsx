import React from 'react';

export default function Orbs({ t }) {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {[
        [560, 560, '-12%', 'auto', '-6%', 'auto', t.o1, 'orb 22s ease-in-out infinite'],
        [420, 420, 'auto', '-5%', '38%', 'auto', t.o2, 'orb 28s ease-in-out infinite reverse'],
        [300, 300, 'auto', 'auto', '6%', '14%', t.o3, 'orb 18s ease-in-out infinite 4s'],
        [260, 260, '16%', 'auto', '56%', 'auto', t.o1, 'orb 24s ease-in-out infinite 8s'],
      ].map(([w, h, top, bottom, right, left, bg, anim], i) => (
        <div key={i} style={{
          position: 'absolute', width: w, height: h, borderRadius: '50%',
          background: `radial-gradient(circle,${bg},transparent 70%)`,
          top, bottom, right, left, animation: anim, transition: 'background 1.2s'
        }} />
      ))}
    </div>
  );
}