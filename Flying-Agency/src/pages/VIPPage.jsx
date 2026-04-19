import React, { useState } from "react";
import Orbs from "../components/Orbs";
import StarField from "../components/StarField";
import Pill from "../components/Pill";
import Btn from "../components/Btn";

export default function VIPPage({ t }) {
  const [rev, setRev] = useState(false);
  const [form, setForm] = useState({ alias: "", dest: "", token: "" });
  const [focused, setFocused] = useState(null);

  const features = [
    {
      i: "🎭",
      ti: "Pseudonymous Identity",
      d: "Temp travel IDs generated and cryptographically purged after use.",
    },
    {
      i: "🔐",
      ti: "Encrypted Channels",
      d: "E2E encryption between VIP clients and authorized liaisons.",
    },
    {
      i: "🗺️",
      ti: "Multi-Leg Routing",
      d: "Origin & destination obscured through layered multi-stop routes.",
    },
    {
      i: "💫",
      ti: "Auto Data Purge",
      d: "All records self-destruct within 72 hours of completion.",
    },
  ];

  const fields = [
    { k: "alias", l: "ALIAS IDENTITY",  p: "Enter pseudonym…"   },
    { k: "dest",  l: "DESTINATION",     p: "Encrypted…"          },
    { k: "token", l: "MFA TOKEN",       p: "000000"              },
  ];

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
      <StarField n={40} />
      <Orbs t={t} />

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 5vw",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Pill label="Ultra Classified · Tier-Omega" t={t} lg />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              color: t.a,
              marginTop: 14,
              lineHeight: 1.0,
              textShadow: `0 0 60px ${t.glow}`,
              animation: "glowBreath 3s ease-in-out infinite",
            }}
          >
            VIP Escape
          </h1>
          <p
            style={{
              color: t.textMuted,
              fontSize: 14,
              marginTop: 14,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              maxWidth: 480,
              margin: "14px auto 0",
              lineHeight: 1.9,
            }}
          >
            Identity abstraction. Confidential routing. Zero trace. For those
            who need to vanish in absolute luxury.
          </p>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              data-h
              style={{
                background: t.bgCard,
                borderRadius: 18,
                padding: "22px",
                border: `1px solid ${t.border}`,
                animation: `fadeUp 0.4s ease ${i * 0.09}s both`,
                transition: "all 0.35s",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.a + "55";
                e.currentTarget.style.boxShadow = `0 12px 40px ${t.glow}`;
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 10 }}>{f.i}</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: t.text,
                  marginBottom: 7,
                }}
              >
                {f.ti}
              </h3>
              <p style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.75 }}>
                {f.d}
              </p>
            </div>
          ))}
        </div>

        {/* Secure request card */}
        <div
          style={{
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: `0 0 80px ${t.glow}`,
          }}
        >
          <div
            style={{
              height: 3,
              background: t.grad,
              animation: "gradMove 3s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
          <div
            style={{
              background: t.bgCard,
              padding: 38,
              border: `1px solid ${t.border}`,
              borderTop: "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 22,
                background: `linear-gradient(135deg, ${t.a}1A, ${t.b}1A)`,
                border: `1px solid ${t.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
                color: t.a,
              }}
            >
              ♛
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.55rem",
                color: t.a,
                marginBottom: 7,
              }}
            >
              Request VIP Service
            </h3>
            <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 28 }}>
              Requires Tier-Omega clearance and MFA verification
            </p>

            {!rev ? (
              <Btn
                onClick={() => setRev(true)}
                t={t}
                sx={{ padding: "15px 44px", fontSize: 15 }}
              >
                Initiate Secure Request ♛
              </Btn>
            ) : (
              <div
                style={{
                  textAlign: "left",
                  maxWidth: 340,
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 13,
                  animation: "bloom 0.4s ease both",
                }}
              >
                {fields.map((f) => (
                  <div key={f.k}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 7,
                        fontSize: 10,
                        fontWeight: 700,
                        color: t.a,
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: 1.8,
                      }}
                    >
                      {f.l}
                    </label>
                    <input
                      value={form[f.k]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [f.k]: e.target.value }))
                      }
                      placeholder={f.p}
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: 11,
                        background: t.inp,
                        border: `1.5px solid ${focused === f.k ? t.a : t.border}`,
                        color: t.text,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12,
                        outline: "none",
                        transition: "all 0.3s",
                        boxShadow:
                          focused === f.k ? `0 0 0 3px ${t.glow}` : "none",
                      }}
                      onFocus={() => setFocused(f.k)}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                ))}
                <Btn t={t} full sx={{ marginTop: 7 }}>
                  🔐 Submit Encrypted Request
                </Btn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
