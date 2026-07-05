import "dotenv/config";
import express from 'express';
import cors from 'cors';

// Routes
import campusRoutes from './routes/campus.js';
import studentRoutes from './routes/student.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173", // @TODO: add VERCEL FE URL
  credentials: true,
}));
app.use(express.json());

// --- HEALTH CHECK ---
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// --- CAMPUS ROUTES ---
app.use('/api/campuses', campusRoutes);

// --- STUDENT ROUTES ---
app.use('/api/students', studentRoutes);

const PORT = Number(process.env.PORT ?? 8080); // Render PORT or default 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));