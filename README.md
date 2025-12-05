Blog CMS Full Stack Project

A project that builds a complete Content Management System (CMS) with a Node/Express/MongoDB API and a React (Vite + Tailwind) frontend. It includes authentication, post management, a writer dashboard, and a public-facing blog website.

Technologies

Frontend: React (Vite), React Router, Axios, Tailwind CSS

Backend: Node.js, Express.js, MongoDB/Mongoose, JWT, bcrypt, Multer

Features

User registration, login, logout, and protected routes

CRUD operations for blog posts, search, and tag filtering

User roles: admin and writer

Simple dashboard for managing posts

Public pages that display all posts and detailed post pages

Project Structure
backend/
  config/ db.js
  controllers/ authController.js, postController.js
  middleware/ authMiddleware.js
  models/ User.js, Post.js
  routes/ authRoutes.js, postRoutes.js
  uploads/
  server.js

frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx, main.jsx

.env Configuration
backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=blog_cms
JWT_SECRET=supersecretkey

frontend/.env
VITE_API_URL=http://localhost:5000/api

How to Run the Project
1. Backend API
cd backend
npm install
cp .env.example .env  # update the values
npm run dev           # or npm start

2. Frontend (Vite)
cd frontend
npm install
cp .env.example .env
npm run dev


The frontend will use VITE_API_URL to communicate with the backend API.
Make sure Express is serving image files from the /uploads folder.

Main API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

GET /api/posts

GET /api/posts/:id

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

By default, registration assigns the writer role, while admin has full privileges. Writers can only edit or delete their own posts.
