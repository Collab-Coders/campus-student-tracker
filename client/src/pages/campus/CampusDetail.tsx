import React, { useState } from 'react';

// hooks/types/components
import { CampusDetailProps } from '../../types';
import CampusForm from './CampusForm';

export default function CampusDetail({ campus, isDarkMode, styles, students, onBack, onSave }: CampusDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Handle saving the data from our modular form overlay
  const handleFormSave = (updatedFields: any) => {
    onSave({ 
      ...campus, 
      ...updatedFields 
    });
    setIsEditing(false);
  };

  return (
    <div className='CampusDetailWrapper' style={styles.detailContainer}>
      
      {/* HEADER CONTROL ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button type="button" onClick={onBack} style={styles.editButton}>
          ← Back to Directory
        </button>
        <button type="button" onClick={() => setIsEditing(true)} style={styles.editButton}>
          Edit Campus Details
        </button>
      </div>

      {/* INDIVIDUAL CAMPUS DISPLAY VIEW */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={styles.profileLayout}>
          <div style={styles.detailImageWrapper}>
            <img src={campus.imageUrl} alt={campus.name} style={styles.detailImage} />
          </div>
          
          <div style={styles.profileInfo}>
            <h1 style={styles.title}>{campus.name}</h1>
            <p style={styles.addressText}>📍 {campus.address}</p>
            <hr style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '16px 0' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>About this Institutional Campus</h3>
            <p style={styles.descriptionText}>{campus.description}</p>
          </div>
        </div>

        {/* ENROLLED STUDENTS SUB-SECTION -- @TODO: make clickable for individual students */}
        <div style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>
            Enrolled Student Roster ({students.length})
          </h3>
          
          {students.length === 0 ? (
            <div style={{ 
              padding: '24px', 
              borderRadius: '8px', 
              backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
              border: isDarkMode ? '1px dashed #334155' : '1px dashed #cbd5e1',
              textAlign: 'center',
              color: isDarkMode ? '#94a3b8' : '#718096'
            }}>
              ℹ️ Nobody is currently enrolled at this institutional campus.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {students.map((student) => (
                <div key={student.id} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
                }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>
                    🎓 {student.firstName} {student.lastName}
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: isDarkMode ? '#94a3b8' : '#718096' }}>
                    {student.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FORM */}
      {isEditing && (
        <CampusForm
          mode="edit"
          initialData={campus}
          styles={styles}
          onClose={() => setIsEditing(false)}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
}