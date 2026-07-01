import React from 'react';
import { Link } from 'react-router-dom';

// hooks/types
import { useStore } from '../hooks/useStore';

// styles
import { studentStyles } from '../styling/studentStyles';

export default function Students() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = studentStyles(isDarkMode);

  return (
    <div style={styles.container}>
      
      {/* HEADER BAR AREA */}
      <div style={styles.headerArea}>
        <Link 
          to="/" 
          style={{
            ...styles.editButton,
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            marginBottom: '16px',
            fontWeight: '700',
            gap: '6px'
          }}
        >
          ← Back to Home
        </Link>
        <h1 style={styles.title}>Students Directory</h1>
        <p style={styles.subtitle}>
          Test
        </p>
      </div>

    </div>
  );
}