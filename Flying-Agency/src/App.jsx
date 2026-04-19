import React, { useState } from 'react';
import Nav from './components/Nav.jsx';
import useCursor from './hooks/useCursor';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function App() {
  useCursor();
  const [page, setPage] = useState('home');
  const [mode, setMode] = useState('dark');

  const darkTheme = {
    bg: '#0C0610',
    bgCard: '#14101a',
    bgCard2: '#1a1320',
    text: '#F8F4FF',
    textMuted: '#B7AFC6',
    a: '#F07AB8',
    b: '#8B5CF6',
    grad: 'linear-gradient(135deg,#F07AB8 0%,#8B5CF6 100%)',
    gradR: 'linear-gradient(135deg,#8B5CF6 0%,#F07AB8 100%)',
    glow: 'rgba(240,122,184,0.20)',
    border: 'rgba(255,255,255,0.08)',
    borderH: 'rgba(255,255,255,0.16)',
    cardB: 'rgba(255,255,255,0.07)',
    badge: 'rgba(255,255,255,0.05)',
    navBg: 'rgba(12,6,16,0.72)',
    inp: 'rgba(255,255,255,0.04)',
    heroOv: 'rgba(12,6,16,0.82)',
    o1: 'rgba(240,122,184,0.18)',
    o2: 'rgba(139,92,246,0.18)',
    shimmer: 'linear-gradient(90deg,#F07AB8,#ffffff,#8B5CF6)'
  };

  const lightTheme = {
    ...darkTheme,
    bg: '#f7f3fb',
    bgCard: '#ffffff',
    bgCard2: '#f4edf9',
    text: '#1a1222',
    textMuted: '#6d617d',
    border: 'rgba(0,0,0,0.08)',
    borderH: 'rgba(0,0,0,0.14)',
    cardB: 'rgba(0,0,0,0.08)',
    badge: 'rgba(0,0,0,0.04)',
    navBg: 'rgba(255,255,255,0.70)',
    inp: 'rgba(0,0,0,0.03)',
    heroOv: 'rgba(255,255,255,0.72)',
    o1: 'rgba(240,122,184,0.12)',
    o2: 'rgba(139,92,246,0.12)',
    glow: 'rgba(139,92,246,0.16)'
  };

  const t = mode === 'dark' ? darkTheme : lightTheme;
  const toggleMode = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Nav page={page} setPage={setPage} mode={mode} toggleMode={toggleMode} t={t} />
      {page === 'home' && <HomePage t={t} setPage={setPage} />}
      {page === 'search' && <SearchPage t={t} />}
      {page === 'login' && <LoginPage t={t} setPage={setPage} />}
      {page === 'register' && <RegisterPage t={t} setPage={setPage} />}
      {page === 'dashboard' && <DashboardPage t={t} />}

      {/* cursor elements */}
    <div id="cur" style={{
      position: 'fixed',
      width: '28px',
      height: '28px',
      background: '#f472b6',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 99999,
      transition: 'width 0.2s, height 0.2s, opacity 0.2s'
    }} />
    <div id="cur-dot" style={{
      position: 'fixed',
      width: '5px',
      height: '5px',
      background: '#9d174d',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 99999,
    }} />

    <Nav page={page} setPage={setPage} mode={mode} toggleMode={toggleMode} t={t} />
    {page === 'home' && <HomePage t={t} setPage={setPage} />}
    {page === 'search' && <SearchPage t={t} />}
    {page === 'login' && <LoginPage t={t} setPage={setPage} />}
    {page === 'register' && <RegisterPage t={t} setPage={setPage} />}
    {page === 'dashboard' && <DashboardPage t={t} />}
    </>
  );
}