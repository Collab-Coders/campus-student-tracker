import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { mockCampuses, mockStudents, Campus, Student } from '../types';

// Components
import CampusDetail from './campus/CampusDetail';
import CampusForm from './campus/CampusForm';
import StudentForm from './students/StudentForm'; 

// Styles
import { dashboardStyles } from '../styling/styles';
import { campusStyles } from '../styling/campusStyles';
import { studentStyles } from '../styling/studentStyles'; 

export default function Dashboard() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = dashboardStyles(isDarkMode);
  const campusStyle = campusStyles(isDarkMode);
  const studentStyle = studentStyles(isDarkMode);

  const [campuses, setCampuses] = useState<Campus[]>(mockCampuses);
  const [students, setStudents] = useState<Student[]>(mockStudents); 
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal Control Toggle Flags
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isRegisteringStudent, setIsRegisteringStudent] = useState(false);

  const handleCreateCampusSubmit = (campusData: Omit<Campus, 'id'> & { id?: string }) => {
    const newCampus: Campus = {
      id: String(Date.now()),
      name: campusData.name,
      address: campusData.address,
      description: campusData.description,
      imageUrl: campusData.imageUrl,
    };

    setCampuses([newCampus, ...campuses]);
    setIsAddingNew(false);
  };

  const handleRegisterStudentSubmit = (studentData: Omit<Student, 'id'> & { id?: string }) => {
    const newStudent: Student = {
      id: String(Date.now()),
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      gpa: studentData.gpa,
      campusId: studentData.campusId,
      status: studentData.status,
      imageUrl: studentData.imageUrl,
    };

    setStudents([newStudent, ...students]);
    setIsRegisteringStudent(false);
  };

  const handleDetailSave = (updatedCampus: Campus) => {
    setCampuses(campuses.map((c) => (c.id === updatedCampus.id ? updatedCampus : c)));
    setSelectedCampus(updatedCampus);
  };

  const filteredCampuses = campuses.filter(campus => 
    campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName} ${student.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CAMPUS DETAILS ROUTER VIEW OVERLAY
  if (selectedCampus) {
    const assignedStudents = students.filter(s => s.campusId === selectedCampus.id);
    return (
      <CampusDetail 
        campus={selectedCampus}
        students={assignedStudents}
        isDarkMode={isDarkMode}
        styles={campusStyle}
        onBack={() => setSelectedCampus(null)}
        onSave={handleDetailSave}
      />
    );
  }

  return (
    <div className="DashboardWrapper" style={styles.dashboardLayout}>
      
      {/* LEFT COLUMN: CAMPUSES */}
      <div style={styles.leftColumn}>
        <div style={styles.welcomeHeader}>
          <div>
            <h1 style={styles.mainTitle}>Campus & Student Roster</h1>
            <p style={styles.mainSubtitle}>Your central workspace for organizing campuses, tracking facilities, and keeping up with students.</p>
          </div>
          <button 
            type="button" 
            onClick={() => setIsAddingNew(true)} 
            style={styles.primaryActionButton}
          >
            ➕ Add New Campus
          </button>
        </div>

        {/* SEARCH AND CONTROL BAR */}
        <div style={styles.searchBarRow}>
          <input 
            type="text" 
            placeholder="Search campuses or students by name, email, location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.globalSearchInput}
          />
        </div>

        {/* CAMPUSES HUB TILES */}
        <h2 style={styles.sectionHeaderTitle}>Campuses Facility Network ({filteredCampuses.length})</h2>
        <div style={styles.campusTileGrid}>
          {filteredCampuses.map((campus) => {
            const campusRosterCount = students.filter(s => s.campusId === campus.id).length;

            return (
              <div key={campus.id} style={styles.hubTileCard}>
                <div style={styles.tileImageContainer}>
                  <img src={campus.imageUrl} alt={campus.name} style={styles.tileImage} />
                  <span style={styles.rosterCountBadge}>
                    🎓 {campusRosterCount} Assigned
                  </span>
                </div>
                <div style={styles.tileBody}>
                  <h3 style={styles.tileName}>{campus.name}</h3>
                  <p style={styles.tileAddress}>📍 {campus.address}</p>
                  <p style={styles.tileDesc}>{campus.description}</p>
                  <div style={styles.tileActions}>
                    <button 
                      type="button" 
                      style={{ ...styles.solidActionBtn, width: '100%', flex: 'initial' }}
                      onClick={() => setSelectedCampus(campus)}
                    >
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
            <button 
              type="button" 
              onClick={() => setIsRegisteringStudent(true)} 
              style={styles.textActionLink}
            >
              + Register
            </button>
          </div>

          {/* QUICK STATUS FILTER PILLS */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
            {['All', 'Enrolled', 'Graduated', 'Not Enrolled'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                style={{
                  ...styles.filterPillBtn,
                  backgroundColor: statusFilter === status 
                    ? (isDarkMode ? '#38bdf8' : '#2d3748') 
                    : (isDarkMode ? '#1e293b' : '#edf4f2'),
                  color: statusFilter === status 
                    ? (isDarkMode ? '#0f172a' : '#faf8f5') 
                    : (isDarkMode ? '#94a3b8' : '#4a5568'),
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE STUDENT LIST */}
        <div style={styles.rosterScrollArea}>
          {filteredStudents.length === 0 ? (
            <p style={styles.emptyRosterText}>No records match the current criteria.</p>
          ) : (
            filteredStudents.map((student) => {
              const matchedCampus = campuses.find(c => c.id === student.campusId);
              return (
                <div key={student.id} style={styles.rosterItemRow}>
                  <img src={student.imageUrl} alt={student.firstName} style={styles.rosterAvatar} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={styles.rosterName}>{student.firstName} {student.lastName}</p>
                    <p style={styles.rosterSubtext}>{matchedCampus?.name || 'Unassigned Center'}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: student.status === 'Enrolled' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(148, 163, 184, 0.15)',
                      color: student.status === 'Enrolled' ? '#10b981' : (isDarkMode ? '#94a3b8' : '#64748b'),
                    }}>
                      {student.status}
                    </span>
                    <p style={styles.rosterGpa}>GPA: {student.gpa.toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CAMPUS MODAL FORM */}
      {isAddingNew && (
        <CampusForm 
          mode="add"
          styles={campusStyle}
          onClose={() => setIsAddingNew(false)}
          onSave={handleCreateCampusSubmit}
        />
      )}

      {/* STUDENT MODAL FORM */}
      {isRegisteringStudent && (
        <StudentForm
          mode="add"
          campuses={campuses}
          styles={studentStyle}
          onClose={() => setIsRegisteringStudent(false)}
          onSave={handleRegisterStudentSubmit}
        />
      )}

    </div>
  );
}