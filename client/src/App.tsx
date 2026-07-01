import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useStore } from './hooks/useStore';
import { appLayoutStyles } from './styling/styles';
import { mockCampuses } from './types';

// Components
import Dashboard from './pages/Dashboard';
import Campuses from './pages/Campuses';
import Students from './pages/Students';

function AppContent() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

  const campuses = mockCampuses;
  const students = [];
  
  const location = useLocation();
  const styles = appLayoutStyles(isDarkMode, isSidebarOpen);

  const getNavLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      ...styles.navItem,
      backgroundColor: isActive ? (isDarkMode ? 'rgba(99, 102, 241, 0.2)' : '#e0e7ff') : 'transparent',
      color: isActive ? (isDarkMode ? '#818cf8' : '#4f46e5') : styles.navItem.color,
    };
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div style={styles.appContainer}>
      
      {/* HAMBURGER MENU BUTTON */}
      <header style={styles.topHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button type='button' aria-label='hamburger menu button' style={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
            <FaBars size={18} />
          </button>
          <div style={styles.headerLogo}>Campus & Student Hub</div>
        </div>

        {/* TOP HEADER NAVIGATION LINKS */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <Link to="/" style={getNavLinkStyle('/')}>
            📊 Dashboard
          </Link>
          <Link to="/campuses" style={getNavLinkStyle('/campuses')}>
            🏢 Campuses
          </Link>
          <Link to="/students" style={getNavLinkStyle('/students')}>
            🎓 Students
          </Link>
        </nav>

        <div style={{ width: '40px' }} />
      </header>

      {/* DIM BACKDROP CLOSES PANEL WHEN CLICKED OUTSIDE */}
      <div style={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />

      {/* SLIDING SIDE PANEL */}
      <aside style={styles.sidePanel}>
        <button type='button' aria-label='close button' style={styles.closeButton} onClick={() => setIsSidebarOpen(false)}>
          <FaTimes />
        </button>

        <div style={styles.logoSection}>Campus & Student Hub</div>
        
        <nav>
          <ul style={styles.navLinksStack}>
            <li>
              <Link to="/" style={getNavLinkStyle('/')} onClick={() => setIsSidebarOpen(false)}>
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link to="/campuses" style={getNavLinkStyle('/campuses')} onClick={() => setIsSidebarOpen(false)}>
                🏢 Campuses ({campuses.length})
              </Link>
            </li>
            <li>
              <Link to="/students" style={getNavLinkStyle('/students')} onClick={() => setIsSidebarOpen(false)}>
                🎓 Students ({students.length})
              </Link>
            </li>
          </ul>
        </nav>

        <button type='button' aria-label='theme toggle button' onClick={toggleDarkMode} style={styles.toggleButton}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'} Mode
        </button>
      </aside>

      {/* RIGHT MAIN VIEW CONTENT */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </main>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}