import React, { useState } from 'react';

// Components
import StudentForm from './StudentForm';

// hooks/types
import { Campus, Student, StudentDetailProps } from '../../types';
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
  const { students, modifyStudentField, removeStudent } = useStudent();
  const { campuses } = useCampus();
  const student = students?.find((s: Student) => s.id === initialStudent.id) || initialStudent;

  // Handle saving the data
  const handleFormSave = async (updatedFields: any) => {
    try {
      const { id: _ignored, ...rest } = updatedFields;
      await modifyStudentField({
        id: student.id,
        data: {
          ...student,
          ...rest
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

  const assignedCampus = (campuses || []).find((c: any) => c.id === student.campusId);

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={styles.profileLayout}>
          <div style={styles.detailImageWrapper}>
            <img src={student.imageUrl} alt={`${student.firstName} ${student.lastName}`} style={styles.detailImage} />
          </div>

          <div style={{ ...styles.profileInfo, height: '100%' }}>
            <div>
              <h1 style={styles.title}>{student.firstName} {student.lastName}</h1>
              <p style={styles.addressText}>{student.email}</p>
              <hr style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '16px 0' }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: isDarkMode ? '#f8fafc' : '#2d3748' }}>Academic Standing</h3>
              <p style={styles.descriptionText}>GPA: {student.gpa}</p>
              <p style={styles.descriptionText}>Status: {student.status}</p>
            </div>

            <div style={styles.assignedCampus}>
              <h3 style={styles.campusHeading}>
                Assigned Campus
              </h3>

              {assignedCampus ? (
                <div style={styles.campusContainer}>
                  <div style={styles.campusImageContainer}>
                    <img src={assignedCampus.imageUrl} alt={assignedCampus.name} style={styles.campusImage} />
                  </div>
                  <div>
                    <p style={styles.campusName}>{assignedCampus.name}</p>
                    <p style={styles.campusAddress}>📍 {assignedCampus.address}</p>
                  </div>
                </div>
              ) : (
                <div style={styles.noCampus}>
                  ℹ️ Not currently assigned to a campus.
                </div>
              )}
            </div>
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