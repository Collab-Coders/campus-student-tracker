import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import CampusDetail from './CampusDetail';

// hooks/types
import { useStore } from '../../hooks/useStore';
import { mockCampuses as initialCampuses } from '../../types';

// styles
import { campusStyles } from '../../styling/campusStyles';

interface Campus {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
}

export default function Campuses() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = campusStyles(isDarkMode);

  const [campuses, setCampuses] = useState<Campus[]>(initialCampuses);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [editingCampus, setEditingCampus] = useState<Campus | null>(null);
  
  // TRACK STATE FOR CREATION PIPELINE
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Unified Form Fields
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');

  // Open modal for a clean creation form
  const openAddModal = () => {
    setIsAddingNew(true);
    setFormName('');
    setFormAddress('');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop'); // reasonable default
  };

  // Open modal for updating an existing campus
  const openEditModal = (campus: Campus) => {
    setEditingCampus(campus);
    setFormName(campus.name);
    setFormAddress(campus.address);
    setFormDescription(campus.description);
    setFormImage(campus.imageUrl);
  };

  const closeModal = () => {
    setEditingCampus(null);
    setIsAddingNew(false);
  };

  // Handle Form Submission (Both Adding & Editing)
  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNew) {
      // Create fresh item
      const newCampus: Campus = {
        id: String(Date.now()), // Unique simple string timestamp ID
        name: formName,
        address: formAddress,
        description: formDescription,
        imageUrl: formImage,
      };
      setCampuses([newCampus, ...campuses]);
    } else if (editingCampus) {
      // Modify current item
      const updated: Campus = {
        ...editingCampus,
        name: formName,
        address: formAddress,
        description: formDescription,
        imageUrl: formImage,
      };
      setCampuses(campuses.map((c) => (c.id === editingCampus.id ? updated : c)));
      if (selectedCampus?.id === editingCampus.id) setSelectedCampus(updated);
    }

    closeModal();
  };

  const handleDetailSave = (updatedCampus: Campus) => {
    setCampuses(campuses.map((c) => (c.id === updatedCampus.id ? updatedCampus : c)));
    setSelectedCampus(updatedCampus);
  };

  if (selectedCampus) {
    return (
      <CampusDetail 
        campus={selectedCampus}
        students={[]}
        isDarkMode={isDarkMode}
        styles={styles}
        onBack={() => setSelectedCampus(null)}
        onSave={handleDetailSave}
      />
    );
  }

  // Show modal if editing or adding
  const showModal = isAddingNew || !!editingCampus;

  return (
    <div style={styles.container}>
      
      {/* HEADER BAR AREA */}
      <div style={styles.headerArea}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <Link 
            to="/" 
            style={{
              ...styles.editButton,
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              fontWeight: '700',
              gap: '6px'
            }}
          >
            ← Back to Home
          </Link>

          {/* ADD CAMPUS BUTTON CONTROL */}
          <button 
            type="button" 
            onClick={openAddModal}
            style={{ ...styles.viewButton, flex: 'initial', padding: '10px 20px' }}
          >
            ➕ Add Campus
          </button>
        </div>
        
        <h1 style={styles.title}>Campuses Directory</h1>
        <p style={styles.subtitle}>
          Comprehensive management directory for active institutional networks.
        </p>
      </div>

      {/* RESPONSIVE CARDS GRID */}
      <div style={styles.grid}>
        {campuses.map((campus) => (
          <div key={campus.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={campus.imageUrl} alt={campus.name} style={styles.image} />
            </div>

            <div style={styles.contentArea}>
              <h3 style={styles.campusName}>{campus.name}</h3>
              <p style={styles.address}>📍 {campus.address}</p>
              <p style={styles.description}>{campus.description}</p>

              <div style={styles.actionRow}>
                <button 
                  type="button" 
                  style={styles.viewButton}
                  onClick={() => setSelectedCampus(campus)}
                >
                  View Details
                </button>
                <button 
                  type="button" 
                  style={styles.editButton}
                  onClick={() => openEditModal(campus)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT FORM */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <form onSubmit={handleFormSave} style={{...styles.formCard, width: '90%', maxWidth: '550px', margin: '0 16px'}}>
            <h2 style={{ ...styles.title, fontSize: '20px', marginBottom: '20px' }}>
              {isAddingNew ? 'Create New Institutional Campus' : 'Quick Edit Campus'}
            </h2>
            
            <div style={styles.formGroup}>
              <label htmlFor="modal-name-input" style={styles.formLabel}>Campus Name</label>
              <input 
                id="modal-name-input"
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                style={styles.formInput}
                placeholder="e.g., Manhattan Extension Center"
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="modal-address-input" style={styles.formLabel}>Location Address</label>
              <input 
                id="modal-address-input"
                type="text" 
                value={formAddress} 
                onChange={(e) => setFormAddress(e.target.value)} 
                style={styles.formInput}
                placeholder="e.g., 123 Tech Way, New York, NY"
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="modal-image-input" style={styles.formLabel}>Banner Image URL</label>
              <input 
                id="modal-image-input"
                type="url" 
                value={formImage} 
                onChange={(e) => setFormImage(e.target.value)} 
                style={styles.formInput}
                required 
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="modal-description-input" style={styles.formLabel}>Campus Overview Description</label>
              <textarea 
                id="modal-description-input"
                value={formDescription} 
                onChange={(e) => setFormDescription(e.target.value)} 
                style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }}
                placeholder="Describe academic facilities, core specializations, or campus environment..."
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={closeModal} style={styles.editButton}>
                Cancel
              </button>
              <button type="submit" style={{ ...styles.viewButton, flex: 'initial' }}>
                {isAddingNew ? 'Create Campus' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}