import React, { useState, useEffect } from 'react';

// hooks/types
import { StudentFormProps } from '../../types';

export default function StudentForm({
  mode,
  initialData,
  campuses,
  styles,
  onClose,
  onSave,
}: StudentFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gpa, setGpa] = useState<number>(0.0);
  const [campusId, setCampusId] = useState('');
  const [status, setStatus] = useState<'Enrolled' | 'Graduated' | 'Not Enrolled'>('Enrolled');
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState('');

  // Prefill form fields if editing an existing student profile
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmail(initialData.email);
      setGpa(initialData.gpa);
      setCampusId(initialData.campusId);
      setStatus(initialData.status);
      setImageUrl(initialData.imageUrl || '');
    } else {
      // Reset values if in "add" mode
      setFirstName('');
      setLastName('');
      setEmail('');
      setGpa(4.0);
      setCampusId(campuses[0]?.id || '');
      setStatus('Enrolled');
      setImageUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'); // Default fallback profile placeholder
    }
  }, [mode, initialData, campuses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Input Cleanliness Checks
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Please provide a first name, last name, and email address.');
      return;
    }

    if (gpa < 0 || gpa > 4.0 || isNaN(gpa)) {
      setError('GPA must be a valid number between 0.00 and 4.00.');
      return;
    }

    if (!campusId) {
      setError('Please assign this student to a campus destination.');
      return;
    }

    setError('');
    
    onSave({
      ...(mode === 'edit' && initialData ? { id: initialData.id } : {}),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      gpa: Number(gpa),
      campusId,
      status,
      imageUrl: imageUrl.trim(),
    });
  };

  return (
    <div className="StudentFormWrapper" style={styles.modalOverlay}>
      <div style={styles.formCard} onClick={(e) => e.stopPropagation()}>
        
        {/* Title Header */}
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
          {mode === 'add' ? 'Register New Student' : 'Edit Student Profile'}
        </h2>
        <p style={{ fontSize: '14px', color: styles.subtitle?.color, marginBottom: '24px' }}>
          {mode === 'add' 
            ? 'Input student bio details, current standing, and assign their base facility.'
            : 'Modify standing status, score updates, or location transfers here.'
          }
        </p>

        {/* Error Flag Alert box */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '14px',
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div style={styles.rowGroup}>
            <div style={styles.formGroup}>
              <label htmlFor="student-firstname" style={styles.formLabel}>First Name</label>
              <input
                id="student-firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                style={styles.formInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="student-lastname" style={styles.formLabel}>Last Name</label>
              <input
                id="student-lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                style={styles.formInput}
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label htmlFor="student-email" style={styles.formLabel}>Institutional Email</label>
            <input
              id="student-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="j.doe@academy.edu"
              style={styles.formInput}
            />
          </div>

          {/* Campus & GPA Assignments */}
          <div style={styles.rowGroup}>
            <div style={{ ...styles.formGroup, flex: 2 }}>
              <label htmlFor="student-campus" style={styles.formLabel}>Assigned Campus Facility</label>
              <select
                id="student-campus"
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                style={styles.formInput}
              >
                <option value="" disabled>Select Location...</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label htmlFor="student-gpa" style={styles.formLabel}>Current GPA</label>
              <input
                id="student-gpa"
                type="number"
                step="0.01"
                min="0.0"
                max="4.0"
                value={gpa || ''}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                placeholder="4.00"
                style={styles.formInput}
              />
            </div>
          </div>

          {/* Status Selector */}
          <div style={styles.formGroup}>
            <label htmlFor="student-status" style={styles.formLabel}>Academic Standing Status</label>
            <select
              id="student-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              style={styles.formInput}
            >
              <option value="Enrolled">Enrolled</option>
              <option value="Graduated">Graduated</option>
              <option value="Not Enrolled">Not Enrolled</option>
            </select>
          </div>

          {/* Profile Picture Avatar URL */}
          <div style={styles.formGroup}>
            <label htmlFor="student-avatar" style={styles.formLabel}>Profile Avatar Photo URL</label>
            <input
              id="student-avatar"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              style={styles.formInput}
            />
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button
              type="button"
              onClick={onClose}
              style={styles.editButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.viewButton}
            >
              {mode === 'add' ? 'Create Record' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}