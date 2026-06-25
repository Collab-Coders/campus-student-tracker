import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useStore } from './hooks/useStore';
import { appLayoutStyles } from './styling/styles';

// Components
import Dashboard from './pages/Dashboard';
import Campuses from './pages/Campuses';
import Students from './pages/Students';

function AppContent() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const campuses = useStore((state) => state.campuses);
  const students = useStore((state) => state.students);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  
  const location = useLocation();
  const styles = appLayoutStyles(isDarkMode, isSidebarOpen);

  const getNavLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      ...styles.navItem,
      backgroundColor: isActive ? (isDarkMode ? '#333333' : '#e2e8f0') : 'transparent',
      color: isActive ? (isDarkMode ? '#ffffff' : '#1a202c') : styles.navItem.color,
    };
  };

  return (
    <div style={styles.appContainer}>
      
      {/* HAMBURGER MENU BUTTON */}
      {!isSidebarOpen && (
        <button type='button' aria-label='hamburger menu button' style={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
          <FaBars size={20} />
        </button>
      )}

      {/* DIM BACKDROP CLOSES PANEL WHEN CLICKED OUTSIDE */}
      <div style={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />

      {/* SLIDING SIDE PANEL */}
      <aside style={styles.sidePanel}>
        <button type='button' aria-label='close button' style={styles.closeButton} onClick={() => setIsSidebarOpen(false)}>
          <FaTimes />
        </button>

        <div style={styles.logoSection}>Base EduManager</div>
        
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