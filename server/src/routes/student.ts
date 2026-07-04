import express from 'express';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  const students = await prisma.student.findMany({ include: { campus: true } });
  res.json(students);
});

// POST - Create a student
router.post('/', async (req, res) => {
  const { firstName, lastName, email, gpa, imageUrl, campusId, status } = req.body;
  try {
    const newStudent = await prisma.student.create({
      data: { firstName, lastName, email, gpa, imageUrl, campusId, status }
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: "Failed to create student. Check if campusId exists." });
  }
});

// PATCH - Transfer/Update student
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await prisma.student.update({
    where: { id },
    data: req.body
  });
  res.json(updatedStudent);
});

// DELETE - Remove student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.student.delete({ where: { id } });
  res.status(204).send();
});

export default router;