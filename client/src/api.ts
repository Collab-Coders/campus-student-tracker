const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = {
  // --- CAMPUSES ---
  getCampuses: async () => {
    const res = await fetch(`${BASE_URL}/api/campuses`);
    if (!res.ok) throw new Error("Failed to fetch campuses");
    return res.json();
  },
  createCampus: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/campuses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to create campus");
    return res.json();
  },
  updateCampus: async (id: string, data: any) => {
    const res = await fetch(`${BASE_URL}/api/campuses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update campus");
    return res.json();
  },
 deleteCampus: async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/campuses/${id}`, { 
    method: 'DELETE' 
  });
  if (!res.ok) {
    throw new Error("Failed to delete campus");
  }
  if (res.status === 204) {
    return null; 
  }

  return res.json();
},

  // --- STUDENTS ---
  getStudents: async () => {
    const res = await fetch(`${BASE_URL}/api/students`);
    if (!res.ok) throw new Error("Failed to fetch students");
    return res.json();
  },
  createStudent: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to register student");
    return res.json();
  },
  updateStudent: async (id: string, data: any) => {
    const res = await fetch(`${BASE_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update student");
    return res.json();
  },
  patchStudent: async (id: string, data: any) => {
    const res = await fetch(`${BASE_URL}/api/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to patch student");
    return res.json();
  },
  deleteStudent: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/students/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Failed to delete student");
    return res.json();
  },
};