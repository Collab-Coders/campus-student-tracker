import React, { useState, useEffect } from 'react';

// hooks/types
import { CampusFormProps } from '../../types';

export default function CampusForm({
  mode,
  initialData,
  styles,
  onClose,
  onSave,
}: CampusFormProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(''); // error state

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setAddress(initialData.address);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl);
    } else {
      setName('');
      setAddress('');
      setDescription('');
      setImageUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
    }
  }, [mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!name.trim() || !address.trim() || !description.trim()) {
      setError('Please fill in all required campus details.');
      return;
    }

    setError('');
    onSave({
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });
  };

  return (
    <div className='CampusFormWrapper' style={styles.modalOverlay}>
      <form onSubmit={handleSubmit} style={{ ...styles.formCard, width: '90%', maxWidth: '550px', margin: '0 16px' }}>
        
        <h2 style={{ ...styles.title, fontSize: '20px', marginBottom: '6px' }}>
          {mode === 'add' ? 'Create New Institutional Campus' : 'Quick Edit Campus'}
        </h2>
        <p style={{ color: styles.subtitle?.color, fontSize: '14px', marginBottom: '24px' }}>
          Input details regarding facility location, description, and visual assets.
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
        
        <div style={styles.formGroup}>
          <label htmlFor="form-name" style={styles.formLabel}>Campus Name</label>
          <input 
            id="form-name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={styles.formInput}
            placeholder="e.g., Manhattan Extension Center"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="form-address" style={styles.formLabel}>Location Address</label>
          <input 
            id="form-address"
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            style={styles.formInput}
            placeholder="e.g., 123 Tech Way, New York, NY"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="form-image" style={styles.formLabel}>Banner Image URL</label>
          <input 
            id="form-image"
            type="url" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="form-desc" style={styles.formLabel}>Campus Overview Description</label>
          <textarea 
            id="form-desc"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }}
            placeholder="Describe academic facilities..."
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={styles.editButton || styles.outlineActionBtn}>
            Cancel
          </button>
          <button type="submit" style={{ ...(styles.viewButton || styles.primaryActionButton), flex: 'initial' }}>
            {mode === 'add' ? 'Create Campus' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}