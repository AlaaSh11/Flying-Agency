import React, { useState, useEffect } from 'react';
import Orbs from '../components/Orbs.jsx';
import Pill from '../components/Pill.jsx';

import { apiClient } from '../api/client.js';

const sC = { confirmed: '#55CC88', pending: '#BB88FF', cancelled: '#9090A0' };

export default function DashboardPage({ t }) {
  const [tab, setTab] = useState('bookings');
  const [hovRow, setHovRow] = useState(null);
  const [expRow, setExpRow] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminDests, setAdminDests] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? Seats will be restored.')) return;
    setCancellingId(bookingId);
    try {
      const res = await apiClient(`/api/v1/bookings/${bookingId}/cancel`, { method: 'PATCH' });
      if (res.booking) {
        setDashboardData(prev => ({
          ...prev,
          bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b),
          upcoming: prev.upcoming?.filter(b => b.id !== bookingId),
        }));
      } else {
        alert(res.error || 'Failed to cancel booking.');
      }
    } catch (err) {
      alert('Error cancelling booking.');
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    apiClient('/api/v1/users/me/dashboard').then(data => {
      if (mounted && data) {
        setDashboardData(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (tab === 'admin') {
      apiClient('/api/v1/destinations').then(data => {
        if(data && !data.error) setAdminDests(data);
      });
    }
  }, [tab]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text }}>Loading Dashboard...</div>;
  }

  const { user, bookings, upcoming, exportData } = dashboardData || {};
  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingTop: 90, paddingBottom: 80, transition: 'background 0.8s', position: 'relative' }}>
      <Orbs t={t} />
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 5vw', position: 'relative', zIndex: 1 }}>

        {/* Profile banner */}
        <div style={{ background: t.bgCard, borderRadius: 24, padding: 26, border: `1px solid ${t.border}`, marginBottom: 22, overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle,${t.o1},transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 3, right: 0, background: t.grad, opacity: 0.4 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', position: 'relative' }}>
            <div style={{ width: 68, height: 68, borderRadius: 22, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: t.bg, fontFamily: "'Playfair Display',serif", fontWeight: 700, boxShadow: `0 8px 26px ${t.glow}`, flexShrink: 0, animation: 'glowBreath 3s ease-in-out infinite' }}>{user?.fullName?.[0]?.toUpperCase()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 5 }}><Pill label={`${user?.tier?.toUpperCase()} ✦`} t={t} /></div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.45rem', color: t.text }}>{user?.fullName}</h2>
              <p style={{ color: t.textMuted, fontSize: 12, marginTop: 3 }}>{user?.email}</p>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[{ n: user?.bookingsCount || '0', l: 'Bookings' }, { n: user?.miles || '0', l: 'Miles' }, { n: user?.tier, l: 'Tier' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.45rem', background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'capitalize' }}>{s.n}</div>
                  <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 22, background: t.bgCard, borderRadius: 15, padding: 5, border: `1px solid ${t.border}`, width: 'fit-content' }}>
          {[{ id: 'bookings', l: 'My Bookings' }, { id: 'upcoming', l: 'Upcoming' }, { id: 'export', l: 'Export' }, ...(user?.role === 'admin' ? [{id: 'admin', l: 'Admin Tools 🛡️'}] : [])].map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)} data-h style={{
              background: tab === tb.id ? t.grad : 'transparent', border: 'none', cursor: 'none', padding: '8px 20px', borderRadius: 11,
              color: tab === tb.id ? t.bg : t.textMuted,
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 0.3s',
              boxShadow: tab === tb.id ? `0 4px 16px ${t.glow}` : 'none'
            }}>{tb.l}</button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.4s ease both' }}>
            {bookings.map((b, i) => (
              <div key={i} data-h
                style={{ background: t.bgCard, borderRadius: 20, overflow: 'hidden', border: `1px solid ${hovRow === i ? t.a + '55' : t.cardB}`, display: 'grid', gridTemplateColumns: 'auto 1fr auto', animation: `slideL 0.4s ease ${i * 0.09}s both`, transform: hovRow === i ? 'translateX(5px)' : 'none', transition: 'all 0.32s cubic-bezier(0.23,1,0.32,1)', boxShadow: hovRow === i ? `0 8px 28px ${t.glow}` : 'none' }}
                onMouseEnter={() => setHovRow(i)} onMouseLeave={() => setHovRow(null)}>
                <img src={b.destination?.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'} alt="" style={{ width: 110, objectFit: 'cover', transition: 'filter 0.3s', filter: hovRow === i ? 'saturate(0.85)' : 'saturate(0.55)' }} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 5 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.05rem', color: t.text }}>{b.destination?.name} ({b.destination?.country})</h3>
                    <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 9, fontWeight: 700, background: `${sC[b.status] || '#999'}1A`, color: sC[b.status] || '#999', fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{b.status}</span>
                  </div>
                  <p style={{ color: t.textMuted, fontSize: 12 }}>{new Date(b.travelDate).toLocaleDateString()}</p>
                  <p style={{ color: t.textMuted, fontSize: 10, marginTop: 3, fontFamily: "'Space Mono',monospace" }}>{b.id}</p>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 9 }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: '1.15rem', background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${b.price || b.totalPrice}</div>
                  <button onClick={() => setExpRow(expRow === i ? null : i)} data-h style={{ background: 'transparent', border: `1px solid ${t.border}`, cursor: 'none', padding: '5px 13px', borderRadius: 9, color: t.textMuted, fontSize: 11, transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.a; e.currentTarget.style.color = t.a; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}>Details</button>
                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      disabled={cancellingId === b.id}
                      data-h
                      style={{ background: 'transparent', border: '1px solid #FF336644', cursor: 'none', padding: '5px 13px', borderRadius: 9, color: cancellingId === b.id ? t.textMuted : '#FF6B6B', fontSize: 11, transition: 'all 0.3s', opacity: cancellingId === b.id ? 0.5 : 1 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3366'; e.currentTarget.style.background = '#FF336611'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#FF336644'; e.currentTarget.style.background = 'transparent'; }}>
                      {cancellingId === b.id ? 'Cancelling…' : 'Cancel'}
                    </button>
                  )}
                </div>
                {expRow === i && (
                  <div style={{ gridColumn: '1 / -1', padding: '18px 20px', borderTop: `1px solid ${t.border}`, background: t.bgCard2, color: t.textMuted, fontSize: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                      <div>
                        <div style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>Booking Reference</div>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10 }}>{b.id}</div>
                      </div>
                      <div>
                        <div style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>Party Details</div>
                        <div>{b.guests || 1} Guest(s)</div>
                      </div>
                      <div>
                        <div style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>Payment Status</div>
                        <div>Processed securely via Stripe</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'upcoming' && upcoming && upcoming.length > 0 ? (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, textAlign: 'center', animation: 'fadeUp 0.4s ease both', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${t.o1},transparent 60%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✈️</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.4rem', color: t.text, marginBottom: 7 }}>Next Trip: {upcoming[0].destination?.name}</h3>
              <p style={{ color: t.textMuted, marginBottom: 24, fontSize: 13 }}>{new Date(upcoming[0].travelDate).toLocaleDateString()}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {[{ l: 'Guests', n: upcoming[0].guests }, { l: 'Price Paid', n: `$${upcoming[0].totalPrice}` }, { l: 'Status', n: upcoming[0].status }].map((s, i) => (
                  <div key={i} style={{ background: t.bgCard2, borderRadius: 14, padding: '18px', transition: 'all 0.3s' }}
                    data-h onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${t.glow}`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, background: t.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'capitalize' }}>{s.n}</div>
                    <div style={{ color: t.textMuted, fontSize: 11, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : tab === 'upcoming' && (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, textAlign: 'center', animation: 'fadeUp 0.4s ease both' }}>
            <p style={{ color: t.textMuted }}>No upcoming trips.</p>
          </div>
        )}

        {tab === 'export' && (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, animation: 'fadeUp 0.4s ease both' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.25rem', color: t.text, marginBottom: 7 }}>Export Your Data</h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 22 }}>Download bookings, invoices, and travel history.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 13 }}>
              {[{ f: 'PDF Report', i: '📄', d: 'Full history as PDF' }, { f: 'CSV Export', i: '📊', d: 'Spreadsheet-ready data' }, { f: 'JSON Data', i: '{ }', d: 'Raw data for developers' }, { f: 'Email Summary', i: '✉', d: 'Send to your inbox' }].map((e, i) => (
                <div key={i} data-h style={{ background: t.bgCard2, borderRadius: 13, padding: '16px 18px', cursor: 'none', border: `1px solid ${t.border}`, transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 13 }}
                  onMouseEnter={ev => { ev.currentTarget.style.borderColor = t.a + '55'; ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = `0 8px 24px ${t.glow}`; }}
                  onMouseLeave={ev => { ev.currentTarget.style.borderColor = t.border; ev.currentTarget.style.transform = 'none'; ev.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: t.badge, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{e.i}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: t.text, fontSize: 13 }}>{e.f}</div>
                    <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{e.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'admin' && (
          <div style={{ background: t.bgCard, borderRadius: 20, padding: 28, border: `1px solid ${t.border}`, animation: 'fadeUp 0.4s ease both' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.25rem', color: t.text, marginBottom: 7 }}>Admin Omega Panel ✦</h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 22 }}>Add new global destinations and flight routes directly into the database.</p>
            <form onSubmit={async (e) => {
               e.preventDefault();
               const fd = new FormData(e.target);
               const body = Object.fromEntries(fd.entries());
               const res = await apiClient('/api/v1/destinations', { method: 'POST', body: JSON.stringify(body) });
               if(res && !res.error) {
                  alert('Successfully deployed flight constraint to Global Database!');
                  e.target.reset();
               } else {
                  alert('Error deploying flight: ' + (res?.error || 'Unknown server error'));
               }
            }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
               <input name="name" placeholder="Destination Name (e.g. New York)" required style={{ padding: '12px 16px', background: t.inp, border: `1px solid ${t.border}`, color: t.text, borderRadius: 12, outline: 'none' }} />
               <input name="country" placeholder="Country (e.g. USA)" required style={{ padding: '12px 16px', background: t.inp, border: `1px solid ${t.border}`, color: t.text, borderRadius: 12, outline: 'none' }} />
               <input name="price" placeholder="Base Price (e.g. 599)" type="number" required style={{ padding: '12px 16px', background: t.inp, border: `1px solid ${t.border}`, color: t.text, borderRadius: 12, outline: 'none' }} />
               <select name="category" required style={{ padding: '12px 16px', background: t.inp, border: `1px solid ${t.border}`, color: t.text, borderRadius: 12, outline: 'none' }}>
                  <option value="Luxury">Luxury</option>
                  <option value="Romance">Romance</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Scenic">Scenic</option>
                  <option value="Omega Fleet">Omega Fleet</option>
               </select>
               <input name="image" placeholder="Image URL (Unsplash link) — Optional" style={{ gridColumn: '1 / -1', padding: '12px 16px', background: t.inp, border: `1px solid ${t.border}`, color: t.text, borderRadius: 12, outline: 'none' }} />
               <button type="submit" style={{ gridColumn: '1 / -1', padding: 14, marginTop: 10, background: t.grad, border: 'none', color: t.bg, borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'none' }}>Deploy Flight Route ✦</button>
            </form>
            
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1.1rem', color: t.text, marginTop: 40, marginBottom: 15 }}>Manage Active Destinations</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, maxHeight: '400px', overflowY: 'auto', paddingRight: 10 }}>
               {adminDests.map(d => (
                 <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t.bgCard2, padding: '12px 16px', borderRadius: 12, border: `1px solid ${t.border}` }}>
                   <div>
                     <div style={{ fontWeight: 600, color: t.text }}>{d.name} <span style={{ color: t.textMuted, fontSize: 11, marginLeft: 6 }}>({d.code})</span></div>
                     <div style={{ fontSize: 11, color: t.a }}>{d.country} — ${d.price}</div>
                   </div>
                   <button onClick={async () => {
                     if(window.confirm('Are you sure you want to delete this destination?')) {
                       const res = await apiClient(`/api/v1/destinations/${d.id}`, { method: 'DELETE' });
                       if(res && !res.error) {
                         setAdminDests(prev => prev.filter(x => x.id !== d.id));
                       } else {
                         alert(res?.error || 'Failed to delete');
                       }
                     }
                   }} style={{ background: '#FF336622', color: '#FF3366', border: '1px solid #FF3366', padding: '6px 12px', borderRadius: 8, fontSize: 11, cursor: 'none' }}>Remove</button>
                 </div>
               ))}
               {adminDests.length === 0 && <p style={{color: t.textMuted, fontSize: 12}}>Loading or no destinations found...</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}