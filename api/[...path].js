// Vercel catch-all serverless handler for all /api/* routes
// Uses dynamic import to surface module loading errors as readable JSON
export default async function handler(req, res) {
  let app
  try {
    const mod = await import('../server/index.js')
    app = mod.default
  } catch (err) {
    console.error('[Module Load Error]', err)
    return res.status(500).json({
      success: false,
      phase: 'module_load',
      message: err.message,
      stack: err.stack?.split('\n').slice(0, 8).join('\n')
    })
  }

  try {
    await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  } catch (err) {
    console.error('[Request Handler Error]', err)
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        phase: 'request_handler',
        message: err.message
      })
    }
  }
}
