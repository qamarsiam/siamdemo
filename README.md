# MERN Stack Website

This project uses the MERN stack (MongoDB, Express.js, React, Node.js) with Vite as the frontend build tool.

## Setup & Run

### Backend (Express + MongoDB)

1. Go to `backend` folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file from example
```bash
cp .env.example .env
```

4. Edit `.env` and set:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT tokens
- `PORT`: Backend port (default: 5000)

5. Start the server
```bash
npm run dev
```

### Frontend (React + Vite)

1. Go to `frontend` folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start dev server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Features

- User authentication (register/login)
- Protected routes
- Contact form
- About page
- MongoDB integration
- JWT token-based auth
- Responsive design