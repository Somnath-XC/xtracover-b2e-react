import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import quoteRoutes from './routes/quoteRoutes.js'
import { initializeDatabaseSchema } from './config/initDb.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5012

// Middleware - cors() automatically handles OPTIONS preflight with these settings
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}))
app.use(express.json())

// Normalize URL paths — Nginx may strip /corporate without its trailing slash,
// producing double slashes like //api/quotes. Collapse them to /api/quotes.
app.use((req, res, next) => {
  req.url = req.url.replace(/\/+/g, '/').trimEnd()
  next()
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

// Health Check — BEFORE DB init middleware so it never fails
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'XtraCover B2E MSSQL Backend API',
    timestamp: new Date().toISOString(),
    dbReady: dbInitialized,
    envVarsPresent: {
      SQL_SERVER_HOST: !!process.env.SQL_SERVER_HOST,
      SQL_SERVER_USER: !!process.env.SQL_SERVER_USER,
      SQL_SERVER_PASSWORD: !!process.env.SQL_SERVER_PASSWORD,
      SQL_SERVER_PORT: !!process.env.SQL_SERVER_PORT,
      DB_NAME: !!process.env.DB_NAME,
      JWT_SECRET: !!process.env.JWT_SECRET,
      SMTP_HOST: !!process.env.SMTP_HOST,
      NOTIFICATION_RECIPIENT_EMAIL: !!process.env.NOTIFICATION_RECIPIENT_EMAIL
    }
  })
})

// API Routes — mounted under both /api (dev proxy) and /corporate/api (production)
app.use('/api/admin', authRoutes)
app.use('/api/quotes', quoteRoutes)
app.use('/corporate/api/admin', authRoutes)
app.use('/corporate/api/quotes', quoteRoutes)

// Serve frontend static build files in production mode
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distPath = path.join(__dirname, '../dist')
// NOTE: must come AFTER API routes so /corporate/api/* hits Express, not static files
app.use('/corporate', express.static(distPath))
app.use(express.static(distPath))
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/corporate/api')) {
    return res.sendFile(path.join(distPath, 'index.html'))
  }
  next()
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
