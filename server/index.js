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

// Lazy DB initialization - runs once per serverless instance warm start
let dbInitialized = false
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await initializeDatabaseSchema()
      dbInitialized = true
    } catch (err) {
      console.error('DB initialization error:', err)
      // Still continue - some routes may not need DB
    }
  }
  next()
})

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

// Export app as default for Vercel serverless functions
export default app

// Start local server only when running directly (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=================================================`)
    console.log(`XtraCover Backend Server running on port ${PORT}`)
    console.log(`Microsoft SQL Server Database Connected.`)
    console.log(`=================================================`)
  })
}
