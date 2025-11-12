# Full Stack Todo App

A simple full-stack Todo application built with **Node.js (Express)** for the backend and **React (Vite)** for the frontend. The backend uses **Drizzle ORM** for database management and **JWT authentication**.

---

## ⚙️ Setup Instructions

### Clone the repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

## Front End

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Back End

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend .env

`VITE_API_URL `

### Backtend .env

`DATABASE_URL `

`JWT_SECRET`

## 🗄️ Database Setup

The backend uses Drizzle ORM for schema and migrations.

Install dependencies

```bash
  npm run db:generate
```

Start the server

```bash
  npm run db:migrate
```

## 🎥 Demo Video

https://www.loom.com/share/9156d8beb55542e0b9167546834ee761
