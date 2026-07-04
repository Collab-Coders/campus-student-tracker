import { useEffect, useRef } from 'react';
import { api } from '../src/api';
import { mockStudents } from './types';

export const DataSeeder = () => {
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (hasSeeded.current) return;
    hasSeeded.current = true;

    const seedStudents = async () => {
      try {
        const { data: existingStudents } = await api.getStudents();
        
        if (existingStudents && existingStudents.length > 0) {
          console.log("Students already exist. Skipping seed.");
          return;
        }

        console.log("Seeding students...");
        
        for (const student of mockStudents) {
          const { id, ...studentData } = student; 
          await api.createStudent(studentData);
        }
        
        console.log("Student seeding complete.");
      } catch (err) {
        console.error("Seeding students failed:", err);
      }
    };

    seedStudents();
  }, []);

  return null; 
};