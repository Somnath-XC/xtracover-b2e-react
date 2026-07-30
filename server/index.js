import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import quoteRoutes from './routes/quoteRoutes.js'
import { initializeDatabaseSchema } from './config/initDb.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/admin', authRoutes)
app.use('/api/quotes', quoteRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'XtraCover B2E MSSQL Backend API',
    timestamp: new Date().toISOString()
  })
})

// Initialize DB schema & Start Server
async function startServer() {
  try {
    await initializeDatabaseSchema()
    app.listen(PORT, () => {
      console.log(`=================================================`)
      console.log(`XtraCover Backend Server running on port ${PORT}`)
      console.log(`Microsoft SQL Server Database Connected.`)
      console.log(`=================================================`)
    })
  } catch (err) {
    console.error('Failed to start server due to database initialization error:', err)
  }
}

startServer()
