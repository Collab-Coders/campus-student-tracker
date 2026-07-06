import React, { useState } from 'react';

// Hooks/types
import { useStore } from '../hooks/useStore';
import { useCampus } from '../hooks/useCampus';
import { useStudent } from '../hooks/useStudent';
import { Student } from '../types';

// Components
import CampusDetail from './campus/CampusDetail';
import CampusForm from './campus/CampusForm';
import StudentForm from './students/StudentForm'; 
import Loader from '../components/Loader';

// Styles
import { dashboardStyles } from '../styling/styles';
import { campusStyles } from '../styling/campusStyles';
import { studentStyles } from '../styling/studentStyles'; 

export default function Dashboard() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = dashboardStyles(isDarkMode);
  const campusStyle = campusStyles(isDarkMode);
  const studentStyle = studentStyles(isDarkMode);

  const { campuses, isLoading: isCampusesLoading, addCampus } = useCampus();
  const { students, isLoading: isStudentsLoading, addStudent, updateStudent } = useStudent();
  
  const [selectedCampus, setSelectedCampus] = useState<any | null>(null);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal Control
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isRegisteringStudent, setIsRegisteringStudent] = useState(false);

  // Handlers
  const handleCreateCampusSubmit = (campusData: any) => {
    addCampus(campusData);
    setIsAddingNew(false);
  };

  const handleFormSave = async (studentData: any) => {
    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent.id, data: studentData });
      } else {
        await addStudent(studentData);
      }
      setIsRegisteringStudent(false);
      setEditingStudent(null);
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  // Logic for filtering and sorting
  const filteredCampuses = (campuses || []).filter((campus: any) => 
    campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.address.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a: any, b: any) => a.name.localeCompare(b.name));

  const filteredStudents = (students || []).filter((student: any) => {
    const matchesSearch = `${student.firstName} ${student.lastName} ${student.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));

  // CAMPUS DETAILS ROUTER VIEW OVERLAY
  if (selectedCampus) {
    const assignedStudents = (students || []).filter((s: Student) => s.campusId === selectedCampus.id);
    return (
      <CampusDetail 
        campus={selectedCampus}
        students={assignedStudents}
        isDarkMode={isDarkMode}
        styles={campusStyle}
        onBack={() => setSelectedCampus(null)}
        onSave={(updated) => console.log("Implement update mutation here", updated)}
      />
    );
  }

  if (isCampusesLoading || isStudentsLoading) {
    return <Loader isDarkMode={isDarkMode} />;
  }

  return (
    <div className="DashboardWrapper" style={styles.dashboardLayout}>
      
      {/* LEFT COLUMN: CAMPUSES */}
      <div style={styles.leftColumn}>
        <div style={styles.welcomeHeader}>
          <div>
            <h1 style={styles.mainTitle}>Campus & Student Roster</h1>
            <p style={styles.mainSubtitle}>Your central workspace for organizing campuses and tracking students.</p>
          </div>
          <button type="button" onClick={() => setIsAddingNew(true)} style={styles.primaryActionButton}>
            ➕ Add New Campus
          </button>
        </div>

        <div style={styles.searchBarRow}>
          <input 
            type="text" 
            placeholder="Search campuses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.globalSearchInput}
          />
        </div>

        <h2 style={styles.sectionHeaderTitle}>Campuses Facility Network ({filteredCampuses.length})</h2>
        <div style={styles.campusTileGrid}>
          {filteredCampuses.map((campus: any) => {
            const campusRosterCount = (students || []).filter((s: Student) => s.campusId === campus.id).length;
            return (
              <div key={campus.id} style={styles.hubTileCard}>
                <div style={styles.tileImageContainer}>
                  <img src={campus.imageUrl} alt={campus.name} style={styles.tileImage} />
                  <span style={styles.rosterCountBadge}>🎓 {campusRosterCount} Assigned</span>
                </div>
                <div style={styles.tileBody}>
                  <h3 style={styles.tileName}>{campus.name}</h3>
                  <p style={styles.tileAddress}>📍 {campus.address}</p>
                  <div style={styles.tileActions}>
                    <button type="button" style={{ ...styles.solidActionBtn, width: '100%' }} onClick={() => setSelectedCampus(campus)}>
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: STICKY GLOBAL STUDENT ROSTER PANEL */}
      <div style={styles.rightColumn}>
        <div style={styles.rosterStickyHeader}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={styles.panelHeaderTitle}>Global Student Roster</h3>
            <button type="button" onClick={() => setIsRegisteringStudent(true)} style={styles.textActionLink}>
              + Register
            </button>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
            {['All', 'Enrolled', 'Graduated', 'Not Enrolled'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                style={{
                  ...styles.filterPillBtn,
                  backgroundColor: statusFilter === status ? (isDarkMode ? '#38bdf8' : '#2d3748') : (isDarkMode ? '#1e293b' : '#edf4f2'),
                  color: statusFilter === status ? (isDarkMode ? '#0f172a' : '#faf8f5') : (isDarkMode ? '#94a3b8' : '#4a5568'),
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE STUDENT LIST */}
        <div style={styles.rosterScrollArea}>
          {filteredStudents.map((student: any) => (
            <div 
              key={student.id} 
              style={{ ...styles.rosterItemRow, cursor: 'pointer' }}
              onClick={() => {
                setEditingStudent(student);
                setIsRegisteringStudent(true);
              }}
            >
              <img src={student.imageUrl} alt={student.firstName} style={styles.rosterAvatar} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={styles.rosterName}>{student.firstName} {student.lastName}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={styles.rosterGpa}>GPA: {Number(student.gpa)?.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALS */}
      {isAddingNew && (
        <CampusForm mode="add" styles={campusStyle} onClose={() => setIsAddingNew(false)} onSave={handleCreateCampusSubmit} />
      )}

      {isRegisteringStudent && (
        <StudentForm
          mode={editingStudent ? "edit" : "add"}
          initialData={editingStudent}
          campuses={campuses || []}
          styles={studentStyle}
          onClose={() => {
            setIsRegisteringStudent(false);
            setEditingStudent(null);
          }}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
}