import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/db.js'
import authRoutes from './routes/auth.js'
import contactRoutes from './routes/contact.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// connect to MongoDB
connectDB(process.env.MONGO_URI)

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
