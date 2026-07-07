import React, { useState } from 'react';

// Components
import CampusForm from './CampusForm';

// hooks/types
import { Campus, CampusDetailProps } from '../../types';
import { useCampus } from '../../hooks/useCampus';

export default function CampusDetail({ 
  campus: initialCampus, 
  isDarkMode, 
  styles, 
  students, 
  onBack 
}: CampusDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Hook usage: binding to the live campus data stream and actions
  const { campuses, updateCampus, removeCampus } = useCampus();
  const campus = campuses?.find((c: Campus) => c.id === initialCampus.id) || initialCampus;

  // Handle saving the data
  const handleFormSave = async (updatedFields: any) => {
    try {
      await updateCampus({
        id: campus.id,
        data: {
          ...campus,
          ...updatedFields
        }
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campus? This cannot be undone.")) {
      try {
        await removeCampus(campus.id);
        onBack(); 
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className='CampusDetailWrapper' style={styles.detailContainer}>
      
      {/* HEADER CONTROL ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button type="button" onClick={onBack} style={styles.editButton}>
          ← Back to Directory
        </button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button" 
            onClick={handleDelete} 
            style={{ 
              ...styles.editButton, 
              backgroundColor: isDarkMode ? '#7f1d1d' : '#fee2e2', 
              color: isDarkMode ? '#fca5a5' : '#dc2626', 
              border: '1px solid transparent' 
            }}
          >
            Delete Campus
          </button>
          <button type="button" onClick={() => setIsEditing(true)} style={styles.editButton}>
            Edit Campus Details
          </button>
        </div>
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

        {/* ENROLLED STUDENTS SUB-SECTION */}
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