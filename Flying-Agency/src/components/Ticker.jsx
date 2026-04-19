import React from 'react';

export default function Ticker({ t }) {
  const items = [
    '✦ 180+ Destinations', '✦ Premium Lounges', '✦ 24/7 Concierge', '✦ Zero Compromise',
    '✦ First Class Upgrades', '✦ Exclusive Routes', '✦ VIP Programs', '✦ Award-Winning Service',
    '✦ 180+ Destinations', '✦ Premium Lounges', '✦ 24/7 Concierge', '✦ Zero Compromise',
    '✦ First Class Upgrades', '✦ Exclusive Routes', '✦ VIP Programs', '✦ Award-Winning Service',
  ];
  return (
    <div style={{ overflow: 'hidden', padding: '12px 0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, background: t.gradSoft, position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', animation: 'marquee 28s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2, color: t.a, padding: '0 24px', opacity: 0.8 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}