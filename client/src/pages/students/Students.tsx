import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import StudenDetail from './StudentDetail';
import StudentForm from './StudentForm';

// hooks/types
import { useStore } from '../../hooks/useStore';
import { useStudent } from '../../hooks/useStudent'
import { Student } from '../../types';

// styles
import { studentStyles } from '../../styling/studentStyles';

export default function Students() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = studentStyles(isDarkMode);

  // hooks
  const { students, isLoading, addStudent, updateStudent } = useStudent();

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    targetStudent: any | null;
  }>({
    isOpen: false,
    mode: 'add',
    targetStudent: null,
  });

  const openAddModal = () => setFormModal({ isOpen: true, mode: 'add', targetStudent: null });
  const openEditModal = (campus: any) => setFormModal({ isOpen: true, mode: 'edit', targetStudent: campus });
  const closeModal = () => setFormModal({ isOpen: false, mode: 'add', targetStudent: null });

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

      {/* RESPONSIVE CARDS GRID */}
      <div style={styles.grid}>
        {(students || []).map((student: any) => (
          <div key={student.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={student.imageUrl} alt={student.name} style={styles.image} />
            </div>

            <div style={styles.contentArea}>
              <h3 style={styles.studentName}>{student.name}</h3>
              <p style={styles.address}>📍 {student.address}</p>
              <p style={styles.description}>{student.description}</p>

              <div style={styles.actionRow}>
                <button type="button" style={styles.viewButton} onClick={() => setSelectedStudent(student)}>
                  View Details
                </button>
                <button type="button" style={styles.editButton} onClick={() => openEditModal(student)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
          {formModal.isOpen && (
            <StudentForm 
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