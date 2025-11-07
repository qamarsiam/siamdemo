# Backend (Express + MongoDB)

Run in `backend` folder.

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install deps: `npm install`
3. Run server: `npm run dev` (needs nodemon) or `npm start`

API endpoints:
- POST /api/auth/register {name,email,password}
- POST /api/auth/login {email,password}
- POST /api/contact {name,email,message}
