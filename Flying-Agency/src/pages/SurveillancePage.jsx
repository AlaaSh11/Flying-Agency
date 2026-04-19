import React, { useState } from "react";
import Orbs from "../components/Orbs";
import Pill from "../components/Pill";
import Btn from "../components/Btn";

export default function SurveillancePage({ t }) {
  const [scan, setScan] = useState(false);
  const [log, setLog] = useState([
    "[SYS] Surveillance network online.",
    "[STATUS] 14,802 profiles monitored.",
    "[AUDIT] Last sweep: all clear.",
  ]);

  const alerts = [
    { id: "ALT-001", sub: "ID-7823", pat: "Frequent cross-border",    risk: "CRITICAL", ts: "15 Apr 14:23" },
    { id: "ALT-002", sub: "ID-4412", pat: "Anomalous route deviation", risk: "HIGH",     ts: "15 Apr 12:10" },
    { id: "ALT-003", sub: "ID-9901", pat: "Multiple alias booking",    risk: "HIGH",     ts: "14 Apr 09:55" },
  ];

  const rC = { CRITICAL: "#FF3366", HIGH: "#AA44FF", MEDIUM: "#6688FF" };

  const runScan = () => {
    setScan(true);
    const lines = [
      "[PROC] Initiating deep pattern scan…",
      "[ML] Running anomaly detection model…",
      "[PROC] Cross-referencing 14,802 records…",
      "[ALERT] 3 anomalies flagged.",
      "[DONE] Scan complete.",
    ];
    lines.forEach((l, i) =>
      setTimeout(() => setLog((p) => [...p, l]), i * 700)
    );
    setTimeout(() => setScan(false), lines.length * 700 + 200);
  };

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
            { n: "14,802", l: "Monitored" },
            { n: "3",      l: "Alerts"    },
            { n: "99.7%",  l: "Accuracy"  },
            { n: "LIVE",   l: "Status"    },
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
              {alerts.map((a, i) => (
                <div
                  key={i}
                  data-h
                  style={{
                    padding: "12px 14px",
                    borderRadius: 11,
                    background: t.bg,
                    border: `1px solid ${rC[a.risk]}33`,
                    animation: `slideL 0.4s ease ${i * 0.09}s both`,
                    transition: "all 0.3s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = rC[a.risk] + "66";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = rC[a.risk] + "33";
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
                          background: rC[a.risk],
                          boxShadow: `0 0 8px ${rC[a.risk]}`,
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
                        {a.id}
                      </span>
                    </div>
                    <span
                      style={{
                        padding: "1px 8px",
                        borderRadius: 7,
                        fontSize: 9,
                        fontWeight: 700,
                        background: `${rC[a.risk]}1A`,
                        color: rC[a.risk],
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {a.risk}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>
                    {a.sub} · {a.pat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
