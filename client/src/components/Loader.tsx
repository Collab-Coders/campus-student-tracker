import React from 'react';

export default function Loader({ isDarkMode }: { isDarkMode: boolean }) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: isDarkMode ? '#0f172a' : '#faf8f5',
      color: isDarkMode ? '#f8fafc' : '#1e293b',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: `4px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
      borderTop: `4px solid ${isDarkMode ? '#38bdf8' : '#3182ce'}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <div style={styles.spinner} />
    </div>
  );
}