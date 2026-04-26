import React, { useState } from 'react';
import Orbs from '../components/Orbs.jsx';
import Pill from '../components/Pill.jsx';
import Btn from '../components/Btn.jsx';

import { apiClient } from '../api/client.js';

export default function SearchPage({ t, setPage }) {
  const [trip, setTrip] = useState('round');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dep, setDep] = useState('');
  const [ret, setRet] = useState('');
  const [pax, setPax] = useState(1);
  const [cls, setCls] = useState('Economy');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null);
  const [focused, setFocused] = useState(null);
  const [dests, setDests] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [chkDest, setChkDest] = useState(null);
  const [payLoad, setPayLoad] = useState(false);
  
  React.useEffect(() => {
    let m = true;
    apiClient('/api/v1/destinations').then(data => {
      if (m && data) setDests(data);
    });
    return () => { m = false; };
  }, []);

  const iS = (name) => ({
    width: '100%', padding: '13px 16px', borderRadius: 13,
    background: t.inp, border: `1.5px solid ${focused === name ? t.a : t.border}`,
    color: t.text, fontFamily: "'DM Sans',sans-serif", fontSize: 13, outline: 'none',
    transition: 'all 0.3s', boxShadow: focused === name ? `0 0 0 3px ${t.glow}` : 'none'
  });

  const handleBook = async (destId) => {
    try {
      const res = await apiClient('/api/v1/bookings/confirm', {
        method: 'POST',
        body: JSON.stringify({
           destinationId: destId,
           guests: pax,
           travelDate: dep || new Date().toISOString()
        })
      });
      if (res.booking) {
         // ── Update local seat counts immediately so UI reflects the change ──
         const updateSeats = (list) =>
           list.map(d => d.id === destId ? { ...d, seatsBooked: d.seatsBooked + pax } : d);
         setDests(prev => updateSeats(prev));
         setDisplayedResults(prev => updateSeats(prev));

         setPayLoad(false);
         setChkDest(null);
         setPage('dashboard');
      } else if (res.error === 'Not enough seats available') {
         setPayLoad(false);
         alert(`This flight is fully booked or doesn't have enough seats.\nAvailable: ${res.availableSeats}, Requested: ${res.requestedSeats}`);
      } else {
         setPayLoad(false);
         alert(res.error || 'Booking failed. Please try again.');
      }
    } catch(err) {
      setPayLoad(false);
      alert('Error processing payment. Are you logged in?');
    }
  };
  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingTop: 90, paddingBottom: 80, transition: 'background 0.8s', position: 'relative' }}>
      <Orbs t={t} />
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 5vw', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 36, animation: 'fadeUp 0.5s ease both' }}>
          <Pill label="Flight Search" t={t} />
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.2rem)', color: t.text, marginTop: 12 }}>
            Find Your <em style={{ background: t.shimmer, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite' }}>Perfect</em> Flight
          </h1>
        </div>
        <div style={{ background: t.bgCard, borderRadius: 24, padding: 28, border: `1px solid ${t.border}`, marginBottom: 26, boxShadow: `0 8px 40px ${t.glow}`, animation: 'fadeUp 0.5s ease 0.1s both' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            {['one-way', 'round', 'multi-city'].map(tp => (
              <button key={tp} onClick={() => setTrip(tp)} data-h style={{
                background: trip === tp ? t.grad : t.badge, border: 'none', cursor: 'none',
                padding: '7px 18px', borderRadius: 30, color: trip === tp ? t.bg : t.textMuted,
                fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, transition: 'all 0.3s', textTransform: 'capitalize',
                transform: trip === tp ? 'scale(1.04)' : 'none'
              }}>{tp}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 13, marginBottom: 16 }}>
            {[
              { l: 'FROM', k: 'from', v: from, s: setFrom, p: 'City or airport', ty: 'text' },
              { l: 'TO', k: 'to', v: to, s: setTo, p: 'City or airport', ty: 'text' },
              { l: 'DEPART', k: 'dep', v: dep, s: setDep, p: '', ty: 'date' },
              { l: 'RETURN', k: 'ret', v: ret, s: setRet, p: '', ty: 'date' }
            ].map((f, i) => (
              <div key={i}>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>{f.l}</label>
                <input type={f.ty} value={f.v} onChange={e => f.s(e.target.value)} placeholder={f.p}
                  disabled={f.l === 'RETURN' && trip === 'one-way'}
                  style={{ ...iS(f.k), opacity: f.l === 'RETURN' && trip === 'one-way' ? 0.35 : 1 }}
                  onFocus={() => setFocused(f.k)} onBlur={() => setFocused(null)} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ color: t.textMuted, fontSize: 13 }}>Passengers</span>
                <button onClick={() => setPax(p => Math.max(1, p - 1))} data-h style={{ width: 28, height: 28, borderRadius: '50%', background: t.badge, border: `1px solid ${t.border}`, cursor: 'none', color: t.text, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = t.grad; e.currentTarget.style.color = t.bg; }} onMouseLeave={e => { e.currentTarget.style.background = t.badge; e.currentTarget.style.color = t.text; }}>−</button>
                <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center', color: t.a, fontFamily: "'Space Mono',monospace", fontSize: 15 }}>{pax}</span>
                <button onClick={() => setPax(p => Math.min(9, p + 1))} data-h style={{ width: 28, height: 28, borderRadius: '50%', background: t.badge, border: `1px solid ${t.border}`, cursor: 'none', color: t.text, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = t.grad; e.currentTarget.style.color = t.bg; }} onMouseLeave={e => { e.currentTarget.style.background = t.badge; e.currentTarget.style.color = t.text; }}>+</button>
              </div>
              <select value={cls} onChange={e => setCls(e.target.value)} style={{ ...iS('cls'), width: 'auto', padding: '8px 13px' }} onFocus={() => setFocused('cls')} onBlur={() => setFocused(null)}>
                {['Economy', 'Business', 'First Class'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Btn onClick={() => { 
                setLoading(true); 
                setTimeout(() => { 
                  // Filter mock logic based on "to" input if entered, else show all fetched destinations
                  const matched = to ? dests.filter(d => d.name.toLowerCase().includes(to.toLowerCase()) || d.country.toLowerCase().includes(to.toLowerCase())) : dests;
                  setDisplayedResults(matched);
                  setLoading(false); 
                  setSearched(true); 
                }, 1400); 
              }} t={t}>Search Flights ✦</Btn>
          </div>
        </div>
        {loading && (
          <div style={{ textAlign: 'center', padding: 56, animation: 'fadeIn 0.3s both' }}>
            <div style={{ width: 46, height: 46, margin: '0 auto 14px', border: `2px solid ${t.border}`, borderTopColor: t.a, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            <p style={{ color: t.textMuted, fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 3 }}>SEARCHING BEST FLIGHTS…</p>
          </div>
        )}
        {searched && !loading && (
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
              <h3 style={{ color: t.text, fontWeight: 600, fontSize: 15 }}>{displayedResults.length} flights found</h3>
              <div style={{ display: 'flex', gap: 7 }}>
                {['Best', 'Cheapest', 'Fastest'].map((s, i) => (
                  <button key={s} data-h style={{ background: i === 0 ? t.badge : 'transparent', border: `1px solid ${i === 0 ? t.a : t.border}`, cursor: 'none', padding: '5px 14px', borderRadius: 20, color: i === 0 ? t.a : t.textMuted, fontSize: 11, fontFamily: "'DM Sans',sans-serif", transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.color = t.a; }}
                    onMouseLeave={e => { if (i !== 0) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; } }}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {displayedResults.map((r, i) => (
                <div key={i} onClick={() => setSel(sel === i ? null : i)} data-h
                  style={{ background: t.bgCard, borderRadius: 18, padding: '18px 22px', border: `1px solid ${sel === i ? t.a + '66' : t.cardB}`, boxShadow: sel === i ? `0 8px 32px ${t.glow}` : 'none', cursor: 'none', transition: 'all 0.33s', animation: `slideL 0.4s ease ${i * 0.06}s both`, position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { if (sel !== i) { e.currentTarget.style.borderColor = t.a + '33'; e.currentTarget.style.transform = 'translateX(4px)'; } }}
                  onMouseLeave={e => { if (sel !== i) { e.currentTarget.style.borderColor = t.cardB; e.currentTarget.style.transform = 'none'; } }}>
                  {sel === i && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: t.grad }} />}
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto auto', alignItems: 'center', gap: 20 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: t.text, marginBottom: 6 }}>CTRL ELITE</div>
                      <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 9, fontWeight: 700, background: t.badge, color: t.a, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{r.category || 'Omega Fleet'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '1.2rem', fontWeight: 700, color: t.text }}>08:00</div>
                        <div style={{ fontSize: 10, color: t.a, fontWeight: 700, fontFamily: "'Space Mono',monospace" }}>{from || 'BEY'}</div>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: t.textMuted, marginBottom: 6, fontFamily: "'Space Mono',monospace" }}>Private Jet</div>
                        <div style={{ position: 'relative', height: 1 }}>
                          <div style={{ height: 1, background: `linear-gradient(90deg,${t.a},${t.b},${t.a})` }} />
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, borderRadius: '50%', background: t.a, boxShadow: `0 0 8px ${t.glow}` }} />
                        </div>
                        <div style={{ fontSize: 9, color: t.textMuted, marginTop: 6 }}>Nonstop</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '1.2rem', fontWeight: 700, color: t.text }}>14:00</div>
                        <div style={{ fontSize: 10, color: t.a, fontWeight: 700, fontFamily: "'Space Mono',monospace", textTransform: 'uppercase' }}>{r.name.slice(0,4)}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 82 }}>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '1.3rem', fontWeight: 700, background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${r.price}</div>
                      <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 4 }}>per person</div>
                      {r.capacity != null && (
                        <div style={{ fontSize: 9, color: (r.capacity - r.seatsBooked) <= 5 ? '#FF6B6B' : t.a, fontFamily: "'Space Mono',monospace", marginBottom: 8, letterSpacing: 0.5 }}>
                          {r.capacity - r.seatsBooked <= 0 ? '⚠ FULLY BOOKED' : `${r.capacity - r.seatsBooked} seats left`}
                        </div>
                      )}
                      <Btn onClick={(e) => { e.stopPropagation(); if ((r.capacity - r.seatsBooked) > 0) setChkDest(r); }} t={t} sm sx={{ padding: '6px 16px', fontSize: 12, opacity: (r.capacity - r.seatsBooked) <= 0 ? 0.4 : 1, pointerEvents: (r.capacity - r.seatsBooked) <= 0 ? 'none' : 'auto' }}>
                        {(r.capacity - r.seatsBooked) <= 0 ? 'Full' : 'Check Out'}
                      </Btn>
                    </div>
                  </div>
                  {sel === i && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${t.border}`, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, animation: 'fadeUp 0.3s ease both' }}>
                      {[{ l: 'Baggage', v: '23kg included', i: '🧳' }, { l: 'Seat Selection', v: 'From $12', i: '💺' }, { l: 'Flexibility', v: 'Free 24h cancel', i: '🔄' }].map((d, j) => (
                        <div key={j} style={{ background: t.bgCard2, borderRadius: 11, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span style={{ fontSize: 18 }}>{d.i}</span>
                          <div>
                            <div style={{ fontSize: 9, color: t.textMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{d.l.toUpperCase()}</div>
                            <div style={{ fontSize: 12, color: t.text, fontWeight: 500, marginTop: 2 }}>{d.v}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {chkDest && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn 0.4s ease both' }}>
          <div style={{ background: t.bgCard, borderRadius: 24, padding: '34px 34px', width: '100%', maxWidth: 460, border: `1px solid ${t.border}`, boxShadow: `0 30px 80px ${t.glow}`, position: 'relative', animation: 'bloom 0.5s cubic-bezier(0.23,1,0.32,1) both' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: t.grad, borderRadius: '24px 24px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 700, color: t.text }}>Secure Checkout</h2>
              <span style={{ fontSize: 24 }}>🔒</span>
            </div>
            
            <div style={{ background: t.inp, padding: 18, borderRadius: 14, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 4 }}>Total for {pax} Guest(s)</div>
                <div style={{ color: t.text, fontSize: 13, fontWeight: 500 }}>{chkDest.name}</div>
                {chkDest.capacity != null && (
                  <div style={{ fontSize: 10, marginTop: 4, color: (chkDest.capacity - chkDest.seatsBooked) <= 5 ? '#FF6B6B' : t.a, fontFamily: "'Space Mono',monospace" }}>
                    {chkDest.capacity - chkDest.seatsBooked} seat(s) available
                  </div>
                )}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '1.8rem', background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>${chkDest.price * pax}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>CARD NUMBER</label>
                <input type="text" placeholder="4242 4242 4242 4242" style={iS('card')} onFocus={() => setFocused('card')} onBlur={() => setFocused(null)} maxLength={19} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>EXPIRY</label>
                  <input type="text" placeholder="MM/YY" style={iS('exp')} onFocus={() => setFocused('exp')} onBlur={() => setFocused(null)} maxLength={5} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 7, fontSize: 10, fontWeight: 700, color: t.textMuted, letterSpacing: 1.8, fontFamily: "'Space Mono',monospace" }}>CVC</label>
                  <input type="text" placeholder="123" style={iS('cvc')} onFocus={() => setFocused('cvc')} onBlur={() => setFocused(null)} maxLength={4} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Btn outlined full onClick={() => { if(!payLoad) setChkDest(null); }} t={t} disabled={payLoad}>Cancel</Btn>
              <Btn full onClick={() => {
                 setPayLoad(true);
                 setTimeout(async () => {
                   await handleBook(chkDest.id);
                 }, 2000);
              }} t={t}>
                {payLoad ? 'Authorizing...' : 'Pay Securely ✦'}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}