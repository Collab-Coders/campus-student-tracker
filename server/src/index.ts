import "dotenv/config";
import express from 'express';
import cors from 'cors';

// Routes
import campusRoutes from './routes/campus.js';
import studentRoutes from './routes/student.js';

const app = express();

app.use(cors());
app.use(express.json());

// --- CAMPUS ROUTES ---
app.use('/api/campuses', campusRoutes);

// --- STUDENT ROUTES ---
app.use('/api/students', studentRoutes);

app.listen(8080, () => console.log('Server running on port 8080'));