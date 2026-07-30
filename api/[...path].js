// Vercel catch-all serverless handler for all /api/* routes
import app from '../server/index.js'

export default async function handler(req, res) {
  try {
    // Pass request to Express app
    return await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  } catch (err) {
    console.error('[Vercel Handler Error]', err)
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Server initialization error',
        error: err.message
      })
    }
  }
}
