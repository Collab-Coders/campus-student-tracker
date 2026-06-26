import React from 'react';

// hooks/types
import { useStore } from '../hooks/useStore';
import { mockCampuses } from '../types';

// styles
import { campusStyles } from '../styling/campusStyles';

export default function Campuses() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = campusStyles(isDarkMode);

  return (
    <div style={styles.container}>
      
      {/* HEADER BAR AREA */}
      <div style={styles.headerArea}>
        <h1 style={styles.title}>Campuses Directory</h1>
        <p style={styles.subtitle}>
          Comprehensive management directory for active institutional networks.
        </p>
      </div>

      {/* RESPONSIVE CARDS GRID */}
      <div style={styles.grid}>
        {mockCampuses.map((campus) => (
          <div key={campus.id} style={styles.card}>
            
            {/* CAMPUS IMAGE BANNER */}
            <div style={styles.imageContainer}>
              <img src={campus.imageUrl} alt={campus.name} style={styles.image} />
            </div>

            {/* CAMPUS DETAILS CONTENT */}
            <div style={styles.contentArea}>
              <h3 style={styles.campusName}>{campus.name}</h3>
              <p style={styles.address}>📍 {campus.address}</p>
              <p style={styles.description}>{campus.description}</p>

              {/* CARD ACTION CONTROLS */}
              <div style={styles.actionRow}>
                <button 
                  type="button" 
                  style={styles.viewButton}
                  onClick={() => alert(`Viewing full details for ${campus.name}`)}
                >
                  View Details
                </button>
                <button 
                  type="button" 
                  style={styles.editButton}
                  onClick={() => alert(`Editing profile configuration for ${campus.name}`)}
                >
                  Edit
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}