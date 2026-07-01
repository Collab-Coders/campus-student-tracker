import React, { useState } from 'react';

// hooks/types
import { CampusDetailProps } from '../../types';

export default function CampusDetail({ campus, isDarkMode, styles, students, onBack, onSave }: CampusDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState(campus.name);
  const [address, setAddress] = useState(campus.address);
  const [description, setDescription] = useState(campus.description);
  const [imageUrl, setImageUrl] = useState(campus.imageUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...campus, name, address, description, imageUrl });
    setIsEditing(false);
  };

  return (
    <div style={styles.detailContainer}>
      
      {/* HEADER CONTROL ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button type="button" onClick={onBack} style={styles.editButton}>
          ← Back to Directory
        </button>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} style={styles.editButton}>
            Edit Campus Details
          </button>
        )}
      </div>

      {!isEditing ? (
        /* ========================================================= */
        /* INDIVIDUAL CAMPUS DISPLAY VIEW                            */
        /* ========================================================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={styles.profileLayout}>
            <div style={styles.detailImageWrapper}>
              <img src={imageUrl} alt={name} style={styles.detailImage} />
            </div>
            
            <div style={styles.profileInfo}>
              <h1 style={styles.title}>{name}</h1>
              <p style={styles.addressText}>📍 {address}</p>
              <hr style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '16px 0' }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>About this Institutional Campus</h3>
              <p style={styles.descriptionText}>{description}</p>
            </div>
          </div>

          {/* ========================================================= */
          /* ENROLLED STUDENTS SUB-SECTION                             */
          /* ========================================================= */}
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
      ) : (
        /* FORM */
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <h2 style={{ ...styles.title, fontSize: '20px', marginBottom: '20px' }}>Edit Campus Profile</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="campus-name-input" style={styles.formLabel}>Campus Name</label>
            <input 
              id="campus-name-input"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={styles.formInput}
              required 
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="campus-address-input" style={styles.formLabel}>Location Address</label>
            <input 
              id="campus-address-input"
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              style={styles.formInput}
              required 
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="campus-image-input" style={styles.formLabel}>Banner Image URL</label>
            <input 
              id="campus-image-input"
              type="url" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              style={styles.formInput}
              required 
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="campus-description-input" style={styles.formLabel}>Campus Overview Description</label>
            <textarea 
              id="campus-description-input"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              style={{ ...styles.formInput, minHeight: '120px', resize: 'vertical' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setIsEditing(false)} style={styles.editButton}>
              Cancel Changes
            </button>
            <button type="submit" style={styles.viewButton}>
              Save Configurations
            </button>
          </div>
        </form>
      )}
    </div>
  );
}