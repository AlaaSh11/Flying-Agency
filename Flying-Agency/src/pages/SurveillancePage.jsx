import React, { useState } from "react";
import Orbs from "../components/Orbs";
import Pill from "../components/Pill";
import Btn from "../components/Btn";

import { apiClient } from "../api/client.js";

export default function SurveillancePage({ t }) {
  const [scan, setScan] = useState(false);
  const [log, setLog] = useState([
    "[SYS] Surveillance network online.",
  ]);
  const [stats, setStats] = useState({ monitored: 0, alerts: 0, accuracy: 0, status: '...' });
  const [alertsList, setAlertsList] = useState([]);
  const [access, setAccess] = useState('checking');

  React.useEffect(() => {
    let mounted = true;
    apiClient('/api/v1/users/me/dashboard').then(u => {
      if(!mounted) return;
      if(u && (u.user.role === 'admin' || u.user.tier === 'tier_omega' || u.user.tier === 'omega')) {
         setAccess('granted');
         Promise.all([
           apiClient("/api/v1/surveillance/stats"),
           apiClient("/api/v1/surveillance/alerts")
         ]).then(([st, al]) => {
           if (mounted) {
             if(st) setStats(st);
             if(al) setAlertsList(al);
             setLog(prev => [...prev, "[SYS] Backend synced."]);
           }
         }).catch(err => {
           console.error(err);
           if (mounted) setLog(prev => [...prev, "[ERR] Backend connection failed."]);
         });
      } else {
         setAccess('denied');
      }
    }).catch(() => setAccess('denied'));
    return () => { mounted = false; };
  }, []);

  const rC = { CRITICAL: "#FF3366", HIGH: "#AA44FF", MEDIUM: "#6688FF" };

  const runScan = async () => {
    setScan(true);
    setLog(p => [...p, "[PROC] Initiating deep pattern scan…"]);
    try {
      const res = await apiClient("/api/v1/surveillance/scan", { method: 'POST' });
      setLog(p => [...p, "[ALERT] " + res.message, "[DATA] " + JSON.stringify(res.alert)]);
      setAlertsList(prev => [res.alert, ...prev]);
    } catch (e) {
      setLog(p => [...p, "[ERR] Scan failed: " + e.message]);
    } finally {
      setScan(false);
      setLog(p => [...p, "[DONE] Scan complete."]);
    }
  };

  if (access === 'checking') {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text }}>Establishing Secure Link...</div>;
  }

  if (access === 'denied') {
    return (
      <div style={{ background: t.bg, minHeight: '100vh', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', animation: 'fadeUp 0.4s ease both' }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🚫</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', fontWeight: 700, color: t.text, marginBottom: 12 }}>Access Denied</h1>
          <p style={{ color: t.textMuted, lineHeight: 1.6, marginBottom: 30 }}>Your cryptographic clearance does not permit entry to the global Surveillance Network. Contact Omega Vanguard command.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: t.bg,
        minHeight: "100vh",
        paddingTop: 90,
        paddingBottom: 80,
        transition: "background 0.8s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(${t.a}08 1px, transparent 1px),
                            linear-gradient(90deg, ${t.a}08 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <Orbs t={t} />

      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "0 5vw",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <Pill label="Admin Only — Restricted" t={t} />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: t.a,
              marginTop: 12,
              textShadow: `0 0 40px ${t.glow}`,
            }}
          >
            Surveillance
            <br />
            <em>Network</em>
          </h1>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 15,
            marginBottom: 22,
          }}
        >
          {[
            { n: `${stats.monitored}`, l: "Monitored" },
            { n: `${stats.alerts}`,      l: "Alerts"    },
            { n: `${stats.accuracy}%`,  l: "Accuracy"  },
            { n: stats.status,   l: "Status"    },
          ].map((s, i) => (
            <div
              key={i}
              data-h
              style={{
                background: t.bgCard,
                borderRadius: 16,
                padding: "18px",
                border: `1px solid ${t.border}`,
                animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
                transition: "all 0.3s",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.a + "55";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: t.a,
                  animation: s.n === "LIVE" ? "pulse 2s infinite" : "none",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  color: t.textMuted,
                  fontSize: 10,
                  marginTop: 5,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 0.5,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal + Alerts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Terminal */}
          <div
            style={{
              background: t.bgCard,
              borderRadius: 18,
              padding: 22,
              border: `1px solid ${t.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  color: t.a,
                  letterSpacing: 2,
                }}
              >
                ANALYSIS ENGINE
              </div>
              <Btn onClick={runScan} t={t} sm>
                {scan ? "Scanning…" : "▶ Run Scan"}
              </Btn>
            </div>
            <div
              style={{
                background: t.bg,
                borderRadius: 11,
                padding: 14,
                height: 200,
                overflowY: "auto",
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: t.a,
                lineHeight: 2.1,
                border: `1px solid ${t.border}`,
              }}
            >
              {log.map((l, i) => (
                <div
                  key={i}
                  style={{
                    animation: "fadeIn 0.3s ease both",
                    opacity: 0.6 + (i / log.length) * 0.4,
                  }}
                >
                  {l}
                </div>
              ))}
              {scan && (
                <div style={{ animation: "pulse 0.5s infinite" }}>█</div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div
            style={{
              background: t.bgCard,
              borderRadius: 18,
              padding: 22,
              border: `1px solid ${t.border}`,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: t.a,
                letterSpacing: 2,
                marginBottom: 14,
              }}
            >
              ACTIVE ALERTS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {alertsList.map((a, i) => {
                const riskColor = rC[a.riskLevel?.toUpperCase() || 'MEDIUM'] || '#6688FF';
                return (
                <div
                  key={i}
                  data-h
                  style={{
                    padding: "12px 14px",
                    borderRadius: 11,
                    background: t.bg,
                    border: `1px solid ${riskColor}33`,
                    animation: `slideL 0.4s ease ${i * 0.09}s both`,
                    transition: "all 0.3s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = riskColor + "66";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = riskColor + "33";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: riskColor,
                          boxShadow: `0 0 8px ${riskColor}`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 10,
                          color: t.text,
                          fontWeight: 700,
                        }}
                      >
                        {a.id.slice(0,8)}
                      </span>
                    </div>
                    <span
                      style={{
                        padding: "1px 8px",
                        borderRadius: 7,
                        fontSize: 9,
                        fontWeight: 700,
                        background: `${riskColor}1A`,
                        color: riskColor,
                        fontFamily: "'Space Mono', monospace",
                        textTransform: 'uppercase'
                      }}
                    >
                      {a.riskLevel || a.risk || 'MEDIUM'}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>
                    {a.targetName || a.sub} · {a.location || a.pat}
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
