import express from 'express'
import { getDbPool, mssql } from '../config/db.js'
import { verifyJWTToken } from '../middleware/authMiddleware.js'
import { sendNewInquiryNotification, sendCustomerConfirmationEmail } from '../services/emailService.js'

const router = express.Router()

// POST /api/quotes (Public submission from website QuoteForm)
router.post('/', async (req, res) => {
  const { name, contact, email, message } = req.body

  if (!name || !contact || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, Contact, Email, and Message are all required fields.'
    })
  }

  try {
    const pool = await getDbPool()
    const requestId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`

    await pool
      .request()
      .input('requestId', mssql.NVarChar, requestId)
      .input('name', mssql.NVarChar, name.trim())
      .input('contact', mssql.NVarChar, contact.trim())
      .input('email', mssql.NVarChar, email.trim())
      .input('message', mssql.NVarChar, message.trim())
      .input('status', mssql.NVarChar, 'New Inquiry')
      .query(`
        INSERT INTO BusinessQuotes (RequestId, Name, Contact, Email, Message, Status, SubmittedAt)
        VALUES (@requestId, @name, @contact, @email, @message, @status, GETDATE())
      `)

    const quoteRecord = {
      requestId,
      name: name.trim(),
      contact: contact.trim(),
      email: email.trim(),
      message: message.trim(),
      status: 'New Inquiry',
      submittedAt: new Date().toLocaleString()
    }

    // Trigger internal notification & customer confirmation emails asynchronously
    sendNewInquiryNotification(quoteRecord).catch((err) => {
      console.error('Asynchronous admin email dispatch error:', err)
    })
    sendCustomerConfirmationEmail(quoteRecord).catch((err) => {
      console.error('Asynchronous customer email dispatch error:', err)
    })

    return res.status(201).json({
      success: true,
      message: 'Business quote request recorded successfully.',
      quote: quoteRecord
    })
  } catch (err) {
    console.error('Error creating business quote request in MSSQL:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to record quote submission in database.'
    })
  }
})

// GET /api/quotes (Protected - Returns all submissions from MSSQL)
router.get('/', verifyJWTToken, async (req, res) => {
  try {
    const pool = await getDbPool()
    const result = await pool.request().query(`
      SELECT 
        RequestId AS id,
        Name AS name,
        Contact AS contact,
        Email AS email,
        Message AS message,
        Status AS status,
        CONVERT(VARCHAR(20), SubmittedAt, 120) AS submittedAt
      FROM BusinessQuotes
      ORDER BY SubmittedAt DESC
    `)

    return res.status(200).json({
      success: true,
      quotes: result.recordset
    })
  } catch (err) {
    console.error('Error fetching quotes from MSSQL:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve quote requests from database.'
    })
  }
})

// PATCH /api/quotes/:id/status (Protected - Update status of a quote entry)
router.patch('/:id/status', verifyJWTToken, async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status field is required.' })
  }

  try {
    const pool = await getDbPool()
    const result = await pool
      .request()
      .input('id', mssql.NVarChar, id)
      .input('status', mssql.NVarChar, status)
      .query(`
        UPDATE BusinessQuotes
        SET Status = @status
        WHERE RequestId = @id
      `)

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, message: 'Quote entry not found.' })
    }

    return res.status(200).json({
      success: true,
      message: 'Quote status updated successfully in database.',
      id,
      status
    })
  } catch (err) {
    console.error('Error updating quote status in MSSQL:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to update status in database.'
    })
  }
})

// DELETE /api/quotes/:id (Protected - Delete a quote entry)
router.delete('/:id', verifyJWTToken, async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getDbPool()
    await pool
      .request()
      .input('id', mssql.NVarChar, id)
      .query(`DELETE FROM BusinessQuotes WHERE RequestId = @id`)

    return res.status(200).json({
      success: true,
      message: 'Quote submission deleted from database.',
      id
    })
  } catch (err) {
    console.error('Error deleting quote from MSSQL:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete quote entry from database.'
    })
  }
})

// DELETE /api/quotes (Protected - Clear all quote submissions)
router.delete('/', verifyJWTToken, async (req, res) => {
  try {
    const pool = await getDbPool()
    await pool.request().query(`TRUNCATE TABLE BusinessQuotes`)

    return res.status(200).json({
      success: true,
      message: 'All quote submissions cleared from database.'
    })
  } catch (err) {
    console.error('Error clearing quotes from MSSQL:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to clear quotes from database.'
    })
  }
})

export default router
