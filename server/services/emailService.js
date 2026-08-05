import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Create transporter lazily so env vars are always resolved after dotenv has loaded
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'email-smtp.ap-south-1.amazonaws.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // 587 uses STARTTLS (not SSL)
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  })
}

// Send email notification on new quote submission
export async function sendNewInquiryNotification(quoteData) {
  const recipient = (process.env.NOTIFICATION_RECIPIENT_EMAIL || 'jatin.singh@xtracover.com')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean)
  const fromAddress = process.env.SMTP_FROM_ADDRESS || 'no-reply@xtracover.com'

  const subject = `[XtraCover B2E] New Business Quote Request from ${quoteData.name}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #254696; color: #ffffff; padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.85; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 10px; rounded: 8px; border-radius: 6px; margin-bottom: 16px; }
          .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
          .field-group:last-child { border-bottom: none; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; tracking-wider; margin-bottom: 4px; }
          .value { font-size: 14px; font-weight: 600; color: #0f172a; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap; }
          .footer { background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>XtraCover B2E Portal</h1>
            <p>New Business Quote Submission Received</p>
          </div>
          
          <div class="content">
            <div class="badge">Request ID: ${quoteData.requestId || 'N/A'}</div>

            <div class="field-group">
              <div class="label">Client Full Name</div>
              <div class="value">${quoteData.name}</div>
            </div>

            <div class="field-group">
              <div class="label">Contact Number</div>
              <div class="value">${quoteData.contact}</div>
            </div>

            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${quoteData.email}" style="color: #254696; text-decoration: none;">${quoteData.email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Requirement / Message Details</div>
              <div class="message-box">${quoteData.message}</div>
            </div>

            <div class="field-group">
              <div class="label">Submission Timestamp</div>
              <div class="value" style="font-size: 12px; color: #64748b;">${new Date().toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} XtraCover Enterprise Security & B2E Notification System
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"XtraCover B2E" <${fromAddress}>`,
      to: recipient,
      subject: subject,
      html: htmlContent
    })

    console.log(`Email notification sent successfully to ${recipient} (Message ID: ${info.messageId})`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`Failed to send email notification to ${recipient}:`, err)
    // Return false without breaking the quote creation transaction
    return { success: false, error: err.message }
  }
}
