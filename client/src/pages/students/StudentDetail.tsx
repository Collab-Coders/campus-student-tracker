import React, { useState, useEffect } from 'react';

// Components
import StudentForm from './StudentForm';

// hooks/types
import { Student, StudentDetailProps } from '../../types';
import { useStudent } from '../../hooks/useStudent';
import { useCampus } from '../../hooks/useCampus';

export default function StudentDetail({ 
  student: initialStudent, 
  isDarkMode, 
  styles, 
  onBack 
}: StudentDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Hook usage: binding to the live campus data stream and actions
  const { students, updateStudent, removeStudent } = useStudent();
  const { campuses } = useCampus();
  const student = students?.find((s: Student) => s.id === initialStudent.id) || initialStudent;

  // Handle saving the data
  const handleFormSave = async (updatedFields: any) => {
    try {
      await updateStudent({
        id: student.id,
        data: {
          ...student,
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
    if (window.confirm("Are you sure you want to delete this student? This cannot be undone.")) {
      try {
        await removeStudent(student.id);
        onBack();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className='StudentDetailWrapper' style={styles.detailContainer}>
      
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
            Delete Student
          </button>
          <button type="button" onClick={() => setIsEditing(true)} style={styles.editButton}>
            Edit Student Details
          </button>
        </div>
      </div>

      {/* INDIVIDUAL STUDENT DISPLAY VIEW */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={styles.profileLayout}>
          <div style={styles.detailImageWrapper}>
            <img src={student.imageUrl} alt={student.name} style={styles.detailImage} />
          </div>
          
          <div style={styles.profileInfo}>
            <h1 style={styles.title}>{student.name}</h1>
            <p style={styles.addressText}>{student.email}</p>
            <hr style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '16px 0' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>About this Institutional Campus</h3>
            <p style={styles.descriptionText}>{student.description}</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      {isEditing && (
        <StudentForm
          mode="edit"
          initialData={student}
          styles={styles}
          campuses={campuses}
          onClose={() => setIsEditing(false)}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
}