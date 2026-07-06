import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';

// hooks/types
import { useStore } from '../../hooks/useStore';
import { useCampus } from '../../hooks/useCampus';
import { useStudent } from '../../hooks/useStudent'
import { Student } from '../../types';

// styles
import { studentStyles } from '../../styling/studentStyles';

export default function Students() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = studentStyles(isDarkMode);

  // hooks
  const { students, isLoading, addStudent, updateStudent } = useStudent();
  const { campuses } = useCampus();

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
  const openEditModal = (student: any) => setFormModal({ isOpen: true, mode: 'edit', targetStudent: student });
  const closeModal = () => setFormModal({ isOpen: false, mode: 'add', targetStudent: null });

  const handleFormSave = async (studentData: any) => {
    try {
      if (formModal.mode === 'add') {
        await addStudent(studentData);
      } else if (formModal.mode === 'edit' && formModal.targetStudent) {
        await updateStudent({ 
          id: formModal.targetStudent.id, 
          data: studentData 
        });
      }
      
      closeModal();
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };
  
    if (isLoading) return <div>Loading Students...</div>;
  
    if (selectedStudent) {
      return (
        <StudentDetail 
          student={selectedStudent}
          isDarkMode={isDarkMode}
          styles={styles}
          onBack={() => setSelectedStudent(null)}
        />
      );
    }

  const sortedStudents = [...(students || [])].sort((a: any, b: any) => 
    a.firstName.localeCompare(b.firstName)
  );

  return (
    <div style={styles.container}>
      
      {/* HEADER BAR AREA */}
      <div style={styles.headerArea}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <Link to="/" style={{ ...styles.editButton, display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontWeight: '700', gap: '6px' }}
          >
            ← Back to Home
          </Link>
          <button type="button" onClick={openAddModal} style={{ ...styles.viewButton, flex: 'initial', padding: '10px 20px' }}>
              ➕ Register Student
            </button>
        </div>
        <h1 style={styles.title}>Students Directory</h1>
        <p style={styles.subtitle}>
          Your complete roster for enrollment, GPA tracking, and campus assignments.
        </p>
      </div>

      {/* RESPONSIVE CARDS GRID */}
      <div style={styles.grid}>
        {(sortedStudents || []).map((student: any) => (
          <div key={student.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={student.imageUrl} alt={student.name} style={styles.image} />
            </div>

            <div style={styles.contentArea}>
              <h3 style={styles.studentName}>{student.firstName} {student.lastName}</h3>
              <p style={styles.email}>{student.email}</p>
              <p style={styles.description}>GPA: {student.gpa}</p>
              <p style={styles.description}>Status: {student.status}</p>

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
          initialData={formModal.targetStudent}
          styles={styles}
          campuses={campuses}
          onClose={closeModal}
          onSave={handleFormSave}
         />
      )}

    </div>
  );
}