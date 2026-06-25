# Campuses & Students (Fullstack CRUD Project)

This is a fullstack web app built to manage college campuses and the students enrolled in them. It handles a one-to-many relationship: a campus can have many students, but a student can only belong to one campus at a time (or be completely unenrolled).

We built this as a single repository (monorepo) containing separate directories for the frontend (`client`) and backend (`server`).

This is our final project for **CSCI 39548: Practical Web Development** at Hunter College (Summer 2026).

## Live Links
* **Frontend UI (Vercel):** `https://your-frontend.vercel.app`
* **Backend API (Render):** `https://your-backend.onrender.com`
* **Database (Neon):** PostgreSQL

---

## Tech Stack

### Frontend (`/client`)
* React + Vite + TypeScript
* **React Router:** For page navigation and our 404 page
* **TanStack Query:** For all data fetching, caching, and server state
* **Zustand:** For global client-only UI state
* **Styling:** Custom CSS (built to be fully responsive on mobile and desktop)

### Backend (`/server`)
* Node.js + Express REST API
* TypeScript
* **Prisma ORM:** Tied to a PostgreSQL database on Neon
