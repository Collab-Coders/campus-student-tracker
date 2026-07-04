import express from 'express';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.campus.delete({ where: { id } });
  res.status(204).send();
});

export default router;