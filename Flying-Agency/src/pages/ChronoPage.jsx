import React, { useState } from "react";
import Orbs from "../components/Orbs";
import StarField from "../components/StarField";
import Pill from "../components/Pill";
import Btn from "../components/Btn";

import { apiClient } from "../api/client.js";

export default function ChronoPage({ t }) {
  const [sel, setSel] = useState(null);
  const [eras, setEras] = useState([]);

  React.useEffect(() => {
    let mounted = true;
    apiClient("/api/v1/chrono/destinations")
      .then((data) => {
        if (mounted && data) {
          setEras(data.map(d => ({
            id: d.id,
            label: d.name,
            year: d.year + (d.era === 'BCE' ? ' BCE' : ' CE'),
            emoji: d.emoji || "✦",
            img: d.image || "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077",
            desc: d.description,
            feat: ["AR Guided Tour", "VR Full Immersion"],
            ...d
          })));
        }
      })
      .catch(err => console.error(err));
    return () => { mounted = false; };
  }, []);

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
      <StarField n={80} />
      <Orbs t={t} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 5vw",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Pill label="AR/VR Experience Module" t={t} lg />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              background: t.shimmer,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: 14,
              lineHeight: 1.0,
              animation: "shimmer 4s linear infinite",
            }}
          >
            ChronoTravel™
          </h1>
          <p
            style={{
              color: t.textMuted,
              fontSize: 14,
              marginTop: 14,
              maxWidth: 460,
              margin: "14px auto 0",
              lineHeight: 1.9,
            }}
          >
            Break the boundaries of time. Immersive AR/VR journeys across
            civilizations and futures yet born.
          </p>
        </div>

        {/* Era cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(258px, 1fr))",
            gap: 18,
          }}
        >
          {eras.map((e, i) => (
            <div
              key={e.id}
              onClick={() => setSel(sel === e.id ? null : e.id)}
              data-h
              style={{
                borderRadius: 22,
                overflow: "hidden",
                cursor: "none",
                background: t.bgCard,
                border: `2px solid ${sel === e.id ? t.a + "77" : t.cardB}`,
                boxShadow: sel === e.id ? `0 0 60px ${t.glow}` : "none",
                transform: sel === e.id ? "scale(1.03)" : "scale(1)",
                transition: "all 0.42s cubic-bezier(0.23, 1, 0.32, 1)",
                animation: `fadeUp 0.5s ease ${i * 0.09}s both`,
              }}
            >
              {/* Image */}
              <div
                style={{ position: "relative", height: 188, overflow: "hidden" }}
              >
                <img
                  src={e.img}
                  alt={e.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.4) brightness(0.65)",
                    transform: sel === e.id ? "scale(1.08)" : "scale(1)",
                    transition: "all 0.5s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, ${t.bgCard}ee, transparent 55%)`,
                  }}
                />
                {/* Hover colour wash */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${t.a}22, ${t.b}22)`,
                    opacity: sel === e.id ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />
                {/* Icon badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 13,
                    left: 13,
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: `${t.a}1A`,
                    border: `1px solid ${t.a}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    color: t.a,
                  }}
                >
                  {e.emoji}
                </div>
                {/* Year badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 13,
                    right: 13,
                    padding: "2px 9px",
                    borderRadius: 9,
                    background: t.badge,
                    border: `1px solid ${t.a}44`,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    color: t.a,
                  }}
                >
                  {e.year}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "16px 18px 20px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: t.text,
                    marginBottom: 7,
                  }}
                >
                  {e.label}
                </h3>
                <p
                  style={{
                    color: t.textMuted,
                    fontSize: 11,
                    lineHeight: 1.75,
                    marginBottom: sel === e.id ? 14 : 0,
                  }}
                >
                  {e.desc}
                </p>

                {/* Expanded features */}
                {sel === e.id && (
                  <div style={{ animation: "fadeUp 0.3s ease both" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        marginBottom: 13,
                      }}
                    >
                      {e.feat.map((f, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                        >
                          <div
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: t.a,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: 11, color: t.textMuted }}>
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Btn t={t} full sm sx={{ fontSize: 12 }}>
                      Launch Experience ✦
                    </Btn>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 55,
            textAlign: "center",
            padding: 46,
            background: t.bgCard,
            borderRadius: 24,
            border: `1px solid ${t.border}`,
            boxShadow: `0 0 80px ${t.glow}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 0%, ${t.o1}, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: t.text,
                marginBottom: 10,
              }}
            >
              Ready to Travel Through{" "}
              <em
                style={{
                  background: t.shimmer,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                Time
              </em>
              ?
            </h2>
            <p
              style={{
                color: t.textMuted,
                fontSize: 13,
                marginBottom: 28,
                maxWidth: 440,
                margin: "0 auto 28px",
              }}
            >
              Requires VR headset or AR-compatible device. Every experience
              includes AI narration and 3D reconstruction.
            </p>
            <Btn t={t} sx={{ padding: "15px 44px", fontSize: 15 }}>
              🕰️ Begin Your Temporal Journey
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
