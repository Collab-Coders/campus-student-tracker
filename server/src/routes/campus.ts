import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// GET all campuses
router.get('/', async (req, res) => {
  const campuses = await prisma.campus.findMany();
  res.json(campuses);
});

// GET specific campus with students
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const campus = await prisma.campus.findUnique({
    where: { id },
    include: { students: true }
  });
  campus ? res.json(campus) : res.status(404).json({ message: 'Not found' });
});

// POST new campus
router.post('/', async (req, res) => {
  const { name, imageUrl, address, description } = req.body;
  const newCampus = await prisma.campus.create({
    data: { name, imageUrl, address, description }
  });
  res.status(201).json(newCampus);
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCampus = await prisma.campus.update({
    where: { id },
    data: req.body
  });
  res.json(updatedCampus);
});

// DELETE campus
// DELETE campus
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Start a transaction
    await prisma.$transaction(async (tx) => {
      await tx.student.deleteMany({
        where: { campusId: id }
      });
      
      await tx.campus.delete({ 
        where: { id } 
      });
    });
    
    res.status(204).send();
  } catch (error) {
    console.error("Deletion error:", error);
    res.status(500).json({ error: "Failed to delete campus and its students." });
  }
});

// DELETE all campuses (and students)
router.delete('/all', async (req, res) => {
  try {
    await prisma.student.deleteMany({});
    await prisma.campus.deleteMany({});
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to clear database." });
  }
});

export default router;