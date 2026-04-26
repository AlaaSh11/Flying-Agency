import React, { useState, useEffect, useMemo } from "react";

// ── Pages ──────────────────────────────────────────────
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SurveillancePage from "./pages/SurveillancePage.jsx";
import VIPPage from "./pages/VIPPage.jsx";
import ChronoPage from "./pages/ChronoPage.jsx";

// ── Components ─────────────────────────────────────────
import Nav from "./components/Nav.jsx";

// ── FULL THEMES (IMPORTANT — prevents black screen) ─────
const THEMES = {
  dark: {
    bg: "#0C0610",
    bgCard: "#14101a",
    bgCard2: "#1a1320",
    text: "#F8F4FF",
    textMuted: "#B7AFC6",
    a: "#F07AB8",
    b: "#8B5CF6",
    grad: "linear-gradient(135deg,#F07AB8,#8B5CF6)",
    gradR: "linear-gradient(135deg,#8B5CF6,#F07AB8)",
    glow: "rgba(240,122,184,0.20)",
    border: "rgba(255,255,255,0.08)",
    borderH: "rgba(255,255,255,0.16)",
    cardB: "rgba(255,255,255,0.07)",
    badge: "rgba(255,255,255,0.05)",
    navBg: "rgba(12,6,16,0.72)",
    inp: "rgba(255,255,255,0.04)",
    heroOv: "rgba(12,6,16,0.82)",
    o1: "rgba(240,122,184,0.18)",
    o2: "rgba(139,92,246,0.18)",
    o3: "rgba(255,255,255,0.03)",
    shimmer: "linear-gradient(90deg,#F07AB8,#ffffff,#8B5CF6)",
    scroll: "#F07AB8",
  },

  light: {
    bg: "#f7f3fb",
    bgCard: "#ffffff",
    bgCard2: "#f4edf9",
    text: "#1a1222",
    textMuted: "#6d617d",
    a: "#8B5CF6",
    b: "#F07AB8",
    grad: "linear-gradient(135deg,#8B5CF6,#F07AB8)",
    gradR: "linear-gradient(135deg,#F07AB8,#8B5CF6)",
    glow: "rgba(139,92,246,0.16)",
    border: "rgba(0,0,0,0.08)",
    borderH: "rgba(0,0,0,0.14)",
    cardB: "rgba(0,0,0,0.08)",
    badge: "rgba(0,0,0,0.04)",
    navBg: "rgba(255,255,255,0.70)",
    inp: "rgba(0,0,0,0.03)",
    heroOv: "rgba(255,255,255,0.72)",
    o1: "rgba(240,122,184,0.12)",
    o2: "rgba(139,92,246,0.12)",
    o3: "rgba(0,0,0,0.03)",
    shimmer: "linear-gradient(90deg,#F07AB8,#8B5CF6,#F07AB8)",
    scroll: "#8B5CF6",
  },

  surv: {
    bg: "#04020A",
    bgCard: "#0B0520",
    bgCard2: "#0F0828",
    text: "#ECD8FF",
    textMuted: "#4A2878",
    a: "#CC44FF",
    b: "#8844FF",
    grad: "linear-gradient(135deg,#CC44FF,#8844FF)",
    gradR: "linear-gradient(135deg,#8844FF,#CC44FF)",
    glow: "rgba(204,68,255,0.25)",
    border: "rgba(204,68,255,0.12)",
    borderH: "rgba(204,68,255,0.32)",
    cardB: "rgba(204,68,255,0.1)",
    badge: "rgba(204,68,255,0.1)",
    navBg: "rgba(4,2,10,0.95)",
    inp: "#0D0622",
    heroOv: "rgba(4,2,10,0.96)",
    o1: "rgba(204,68,255,0.07)",
    o2: "rgba(136,68,255,0.06)",
    o3: "rgba(0,0,0,0.03)",
    shimmer: "linear-gradient(90deg,#CC44FF,#8844FF,#CC44FF)",
    scroll: "#CC44FF",
  },

  vip: {
    bg: "#060402",
    bgCard: "#160C06",
    bgCard2: "#1E1208",
    text: "#FFF0CC",
    textMuted: "#806040",
    a: "#FFD060",
    b: "#FF9030",
    grad: "linear-gradient(135deg,#FFD060,#FF9030)",
    gradR: "linear-gradient(135deg,#FF9030,#FFD060)",
    glow: "rgba(255,208,96,0.25)",
    border: "rgba(255,208,96,0.12)",
    borderH: "rgba(255,208,96,0.3)",
    cardB: "rgba(255,208,96,0.1)",
    badge: "rgba(255,208,96,0.09)",
    navBg: "rgba(6,4,2,0.95)",
    inp: "#1A1006",
    heroOv: "rgba(6,4,2,0.96)",
    o1: "rgba(255,208,96,0.06)",
    o2: "rgba(255,144,48,0.05)",
    o3: "rgba(0,0,0,0.03)",
    shimmer: "linear-gradient(90deg,#FFD060,#FF9030,#FFD060)",
    scroll: "#FFD060",
  },

  chrono: {
    bg: "#010610",
    bgCard: "#04101E",
    bgCard2: "#061628",
    text: "#C8E8FF",
    textMuted: "#285070",
    a: "#44CCFF",
    b: "#4488FF",
    grad: "linear-gradient(135deg,#44CCFF,#4488FF)",
    gradR: "linear-gradient(135deg,#4488FF,#44CCFF)",
    glow: "rgba(68,204,255,0.25)",
    border: "rgba(68,204,255,0.12)",
    borderH: "rgba(68,204,255,0.3)",
    cardB: "rgba(68,204,255,0.1)",
    badge: "rgba(68,204,255,0.09)",
    navBg: "rgba(1,6,16,0.95)",
    inp: "#050F20",
    heroOv: "rgba(1,6,16,0.96)",
    o1: "rgba(68,204,255,0.06)",
    o2: "rgba(68,136,255,0.05)",
    o3: "rgba(0,0,0,0.03)",
    shimmer: "linear-gradient(90deg,#44CCFF,#4488FF,#44CCFF)",
    scroll: "#44CCFF",
  },
};

// ── Cursor Hook ────────────────────────────────────────
function useCursor(t) {
  useEffect(() => {
    const dot = document.getElementById("cur");
    const ring = document.getElementById("cur-ring");
    if (!dot || !ring) return;

    dot.style.background = t.a;
    ring.style.borderColor = t.a + "66";

    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    document.addEventListener("mousemove", move);

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [t.a]);
}

// ── App ────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("dark");

  const mood = useMemo(() => {
    if (page === "surveillance") return "surv";
    if (page === "vip") return "vip";
    if (page === "chrono") return "chrono";
    return mode;
  }, [page, mode]);

  const t = THEMES[mood];

  useCursor(t);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;

    let s = document.getElementById("_scr");
    if (!s) {
      s = document.createElement("style");
      s.id = "_scr";
      document.head.appendChild(s);
    }

    s.textContent = `::-webkit-scrollbar-thumb { background: ${t.scroll} }`;

    
    const handleUnauthorized = () => {
      setPage("login");
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [t]);


  const nav = (p) => {
    const isProtected = ["dashboard", "surveillance", "vip", "chrono"].includes(p);
    const token = localStorage.getItem("token");

    if (isProtected && !token) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPage("login");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(p);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav page={page} setPage={nav} mode={mode} toggleMode={() => setMode(m => m === "dark" ? "light" : "dark")} t={t} />

      {page === "home" && <HomePage t={t} setPage={nav} />}
      {page === "login" && <LoginPage t={t} setPage={nav} />}
      {page === "register" && <RegisterPage t={t} setPage={nav} />}
      {page === "search" && <SearchPage t={t} />}
      {page === "dashboard" && <DashboardPage t={t} />}
      {page === "surveillance" && <SurveillancePage t={t} />}
      {page === "vip" && <VIPPage t={t} />}
      {page === "chrono" && <ChronoPage t={t} />}

      <div id="cur" style={{ position: "fixed", width: 10, height: 10, borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />
      <div id="cur-ring" style={{ position: "fixed", width: 34, height: 34, border: "2px solid", borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />
    </div>
  );
}