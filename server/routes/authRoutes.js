import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDbPool, mssql } from '../config/db.js'
import { verifyJWTToken } from '../middleware/authMiddleware.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'xtracover_fallback_secret_2026'

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' })
  }

  try {
    const pool = await getDbPool()
    const result = await pool
      .request()
      .input('email', mssql.NVarChar, email.trim())
      .query(`SELECT TOP 1 * FROM AdminUsers WHERE Email = @email`)

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const adminUser = result.recordset[0]
    const isPasswordValid = await bcrypt.compare(password, adminUser.PasswordHash)

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    // Generate JWT signed token
    const tokenPayload = {
      id: adminUser.Id,
      email: adminUser.Email,
      name: adminUser.Name,
      role: adminUser.Role
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' })

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      user: {
        id: adminUser.Id,
        email: adminUser.Email,
        name: adminUser.Name,
        role: adminUser.Role
      }
    })
  } catch (err) {
    console.error('Error during admin login:', err)
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' })
  }
})

// GET /api/admin/me
router.get('/me', verifyJWTToken, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  })
})

export default router
