import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import CampusDetail from './CampusDetail';
import CampusForm from './CampusForm'; 

// hooks/types
import { useStore } from '../../hooks/useStore';
import { useCampus } from '../../hooks/useCampus';
import { useStudent } from '../../hooks/useStudent'
import { Student } from '../../types';

// styles
import { campusStyles } from '../../styling/campusStyles';

export default function Campuses() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = campusStyles(isDarkMode);

  // hooks
  const { campuses, isLoading, addCampus, updateCampus } = useCampus();
  const { students } = useStudent();
  
  const [selectedCampus, setSelectedCampus] = useState<any | null>(null);
  
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    targetCampus: any | null;
  }>({
    isOpen: false,
    mode: 'add',
    targetCampus: null,
  });

  const openAddModal = () => setFormModal({ isOpen: true, mode: 'add', targetCampus: null });
  const openEditModal = (campus: any) => setFormModal({ isOpen: true, mode: 'edit', targetCampus: campus });
  const closeModal = () => setFormModal({ isOpen: false, mode: 'add', targetCampus: null });

  const handleFormSave = (campusData: any) => {
    if (formModal.mode === 'add') {
      addCampus(campusData);
    } else if (formModal.mode === 'edit' && formModal.targetCampus) {
      updateCampus({ id: formModal.targetCampus.id, data: campusData });
    }
    closeModal();
  };

  if (isLoading) return <div>Loading Campuses...</div>;

  if (selectedCampus) {
    const assignedStudents = (students || []).filter((s: Student) => 
    s.campusId === selectedCampus.id
  );

    return (
      <CampusDetail 
        campus={selectedCampus}
        students={assignedStudents}
        isDarkMode={isDarkMode}
        styles={styles}
        onBack={() => setSelectedCampus(null)}
      />
    );
  }

  return (
    <div className='CampusWrapper' style={styles.container}>
      
      {/* HEADER BAR AREA */}
      <div style={styles.headerArea}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <Link to="/" style={{ ...styles.editButton, display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontWeight: '700', gap: '6px' }}>
            ← Back to Home
          </Link>
          <button type="button" onClick={openAddModal} style={{ ...styles.viewButton, flex: 'initial', padding: '10px 20px' }}>
            ➕ Add Campus
          </button>
        </div>
        
        <h1 style={styles.title}>Campuses Directory</h1>
        <p style={styles.subtitle}>Comprehensive management directory for active institutional networks.</p>
      </div>

      {/* RESPONSIVE CARDS GRID */}
      <div style={styles.grid}>
        {(campuses || []).map((campus: any) => (
          <div key={campus.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={campus.imageUrl} alt={campus.name} style={styles.image} />
            </div>

            <div style={styles.contentArea}>
              <h3 style={styles.campusName}>{campus.name}</h3>
              <p style={styles.address}>📍 {campus.address}</p>
              <p style={styles.description}>{campus.description}</p>

              <div style={styles.actionRow}>
                <button type="button" style={styles.viewButton} onClick={() => setSelectedCampus(campus)}>
                  View Details
                </button>
                <button type="button" style={styles.editButton} onClick={() => openEditModal(campus)}>
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