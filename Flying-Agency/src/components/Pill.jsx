import React from 'react';

export default function Pill({ label, t, lg = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: lg ? '5px 18px' : '3px 12px', borderRadius: 50,
      background: t.badge, border: `1px solid ${t.borderH}`,
      color: t.a, fontSize: lg ? 12 : 10, fontWeight: 700,
      fontFamily: "'Space Mono',monospace", letterSpacing: 1.8, textTransform: 'uppercase'
    }}>
      {label}
    </span>
  );
}