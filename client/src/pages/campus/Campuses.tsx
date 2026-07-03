import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import CampusDetail from './CampusDetail';
import CampusForm from './CampusForm'; 

// hooks/types
import { useStore } from '../../hooks/useStore';
import { mockCampuses as initialCampuses, mockStudents, Campus } from '../../types';

// styles
import { campusStyles } from '../../styling/campusStyles';

export default function Campuses() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = campusStyles(isDarkMode);

  const [campuses, setCampuses] = useState<Campus[]>(initialCampuses);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    targetCampus: Campus | null;
  }>({
    isOpen: false,
    mode: 'add',
    targetCampus: null,
  });

  const openAddModal = () => {
    setFormModal({
      isOpen: true,
      mode: 'add',
      targetCampus: null,
    });
  };

  const openEditModal = (campus: Campus) => {
    setFormModal({
      isOpen: true,
      mode: 'edit',
      targetCampus: campus,
    });
  };

  const closeModal = () => {
    setFormModal({
      isOpen: false,
      mode: 'add',
      targetCampus: null,
    });
  };

  const handleFormSave = (campusData: Omit<Campus, 'id'> & { id?: string }) => {
    if (formModal.mode === 'add') {
      const newCampus: Campus = {
        id: String(Date.now()), // Unique string timestamp ID
        name: campusData.name,
        address: campusData.address,
        description: campusData.description,
        imageUrl: campusData.imageUrl,
      };
      setCampuses([newCampus, ...campuses]);
    } else if (formModal.mode === 'edit' && formModal.targetCampus) {
      const updated: Campus = {
        ...formModal.targetCampus,
        name: campusData.name,
        address: campusData.address,
        description: campusData.description,
        imageUrl: campusData.imageUrl,
      };
      setCampuses(campuses.map((c) => (c.id === formModal.targetCampus!.id ? updated : c)));
      if (selectedCampus?.id === formModal.targetCampus.id) setSelectedCampus(updated);
    }

    closeModal();
  };

  const handleDetailSave = (updatedCampus: Campus) => {
    setCampuses(campuses.map((c) => (c.id === updatedCampus.id ? updatedCampus : c)));
    setSelectedCampus(updatedCampus);
  };

  if (selectedCampus) {
    const assignedStudents = mockStudents.filter(student => student.campusId === selectedCampus.id);

    return (
      <CampusDetail 
        campus={selectedCampus}
        students={assignedStudents}
        isDarkMode={isDarkMode}
        styles={styles}
        onBack={() => setSelectedCampus(null)}
        onSave={handleDetailSave}
      />
    );
  }

  return (
    <div className='CampusWrapper' style={styles.container}>
      
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

      {/* FORM */}
      {formModal.isOpen && (
        <CampusForm 
          mode={formModal.mode}
          initialData={formModal.targetCampus}
          styles={styles}
          onClose={closeModal}
          onSave={handleFormSave}
        />
      )}

    </div>
  );
}