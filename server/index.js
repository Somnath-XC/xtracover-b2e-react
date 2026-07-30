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
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Handle CORS preflight
app.options('*', (req, res) => {
  res.status(200).end()
})

// Lazy DB initialization — runs once per warm serverless instance
let dbInitialized = false
let dbInitError = null

async function ensureDbReady() {
  if (dbInitialized) return
  if (dbInitError) throw dbInitError
  try {
    await initializeDatabaseSchema()
    dbInitialized = true
  } catch (err) {
    dbInitError = err
    throw err
  }
}

app.use(async (req, res, next) => {
  try {
    await ensureDbReady()
    next()
  } catch (err) {
    console.error('DB initialization failed:', err.message)
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Check environment variables.',
      detail: err.message
    })
  }
})

// API Routes
app.use('/api/admin', authRoutes)
app.use('/api/quotes', quoteRoutes)

// Health Check (skips DB check for basic connectivity test)
app.get('/api/health', (req, res) => {
  const envCheck = {
    DB_SERVER: !!process.env.DB_SERVER,
    DB_NAME: !!process.env.DB_NAME,
    DB_USER: !!process.env.DB_USER,
    DB_PASSWORD: !!process.env.DB_PASSWORD,
    JWT_SECRET: !!process.env.JWT_SECRET,
    SMTP_HOST: !!process.env.SMTP_HOST,
    NOTIFICATION_RECIPIENT_EMAIL: !!process.env.NOTIFICATION_RECIPIENT_EMAIL
  }
  res.json({
    status: 'online',
    service: 'XtraCover B2E MSSQL Backend API',
    timestamp: new Date().toISOString(),
    dbReady: dbInitialized,
    envVarsPresent: envCheck
  })
})

// Export app as default for Vercel serverless
export default app

// Start local server only when not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=================================================`)
    console.log(`XtraCover Backend Server running on port ${PORT}`)
    console.log(`Microsoft SQL Server Database Connected.`)
    console.log(`=================================================`)
  })
}
