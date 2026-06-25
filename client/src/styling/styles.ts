import { CSSProperties } from 'react';

export const appLayoutStyles = (isDarkMode: boolean, isSidebarOpen: boolean) => {
  const styles: Record<string, CSSProperties> = {
    appContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden',
    },
    // The Side Panel now uses absolute positioning on mobile view setups
    sidePanel: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '260px',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
      borderRight: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      boxSizing: 'border-box',
      zIndex: 100,
      // Smooth slide animation logic
      transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
    },
    hamburgerButton: {
      position: 'fixed',
      top: '1.5rem',
      left: '1.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      border: isDarkMode ? '1px solid #444' : '1px solid #ccc',
      borderRadius: '6px',
      padding: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 90, // Sits just below the open menu panel
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    },
    closeButton: {
      alignSelf: 'flex-end',
      background: 'none',
      border: 'none',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: '1.5rem',
      cursor: 'pointer',
      marginBottom: '1rem',
    },
    logoSection: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '2.5rem',
      letterSpacing: '0.5px',
    },
    navLinksStack: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      textDecoration: 'none',
      color: isDarkMode ? '#b3b3b3' : '#4a4a4a',
      fontWeight: '500',
      cursor: 'pointer',
    },
    mainContent: {
      flex: 1,
      padding: '6rem 2.5rem 2.5rem 2.5rem', // Added extra top padding so the hamburger icon doesn't block headers
      boxSizing: 'border-box',
    },
    toggleButton: {
      marginTop: 'auto',
      padding: '0.75rem',
      cursor: 'pointer',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: '600',
    },
    // Dark transparent backdrop overlay when menu is active
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 95,
      display: isSidebarOpen ? 'block' : 'none',
    }
  };

  return styles;
};