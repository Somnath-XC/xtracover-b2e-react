import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// Send email notification on new quote submission (Admin)
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

// Send customer confirmation email template when lead/quote is submitted
export async function sendCustomerConfirmationEmail(quoteData) {
  const fromAddress = process.env.SMTP_FROM_ADDRESS
  const subject = 'Thank You for Your Enquiry | XtraCover Corporate Laptop Solutions'

  // Read logo PNG and embed as inline CID attachment
  const logoPath = path.resolve(__dirname, '../../xclogo.png')
  let logoContent = null
  try {
    logoContent = fs.readFileSync(logoPath)
  } catch (e) {
    console.error('Could not read logo image for customer email:', e.message)
  }

  const attachments = []
  if (logoContent) {
    attachments.push({
      filename: 'xclogo.png',
      content: logoContent,
      contentType: 'image/png',
      cid: 'xtracover_logo'
    })
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>XtraCover Corporate Solutions</title>
</head>
<body style="font-family:Inter,Arial,Helvetica,sans-serif;margin:0;padding:0;background-color:#f3f6fa;">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="width:100%; background-color:#f3f6fa; font-family:Inter, Arial, Helvetica, sans-serif;" width="100%">
        <tr>
            <td align="center" style="padding:30px 12px;font-family:Inter,Arial,Helvetica,sans-serif;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="width:600px;max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;font-family:Inter, Arial, Helvetica, sans-serif;"
                    width="600">
                    <!-- Header -->
                    <tr>
                        <td style="padding:28px 35px 20px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                <tr>
                                    <td align="left" style="font-family:Inter,Arial,Helvetica,sans-serif;"
                                        valign="middle">
                                        <img alt="XtraCover" src="cid:xtracover_logo" style="width:210px; max-width:100%;"
                                            width="210" />
                                    </td>
                                    <td align="right" style="font-family:Inter,Arial,Helvetica,sans-serif;"
                                        valign="middle">
                                        <div style="
                      width:55px;
                      height:55px;
                      line-height:55px;
                      text-align:center;
                      border-radius:50%;
                      background-color:#edf5ff;
                      font-size:27px;
                    font-family:Inter,Arial,Helvetica,sans-serif;">
                                            ✉
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Hero -->
                    <tr>
                        <td style="padding:20px 35px 15px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <div style="
                margin:0;
                color:#081d3a;
                font-size:38px;
                line-height:47px;
                font-weight:700;
              font-family:Inter,Arial,Helvetica,sans-serif;">
                                Thank You for Your Interest in
                                <span style="color:#1766b1;font-family:Inter,Arial,Helvetica,sans-serif;">
                                    XtraCover's Corporate Solutions
                                </span>
                            </div>
                            <div style="
                width:95px;
                height:3px;
                margin-top:22px;
                background-color:#28a745;
              font-family:Inter,Arial,Helvetica,sans-serif;"></div>
                        </td>
                    </tr>
                    <!-- Confirmation Message -->
                    <tr>
                        <td style="
              padding:15px 35px 10px 35px;
              color:#44546a;
              font-size:16px;
              line-height:26px;
            font-family:Inter,Arial,Helvetica,sans-serif;">
                            We've successfully received your enquiry, and one of our business
                            solutions specialists will get in touch with you shortly to
                            understand your requirements and recommend the right solution
                            for your organisation.
                        </td>
                    </tr>
                    <!-- Requirement Box -->
                    <tr>
                        <td style="padding:15px 35px 25px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="background-color:#f4f8fc; border-radius:10px;font-family:Inter,Arial,Helvetica,sans-serif;"
                                width="100%">
                                <tr>
                                    <td align="center"
                                        style="padding:20px 10px 20px 20px;font-family:Inter,Arial,Helvetica,sans-serif;"
                                        valign="middle" width="75">
                                        <div style="
                      width:54px;
                      height:54px;
                      line-height:54px;
                      background-color:#0c4b91;
                      color:#ffffff;
                      text-align:center;
                      border-radius:50%;
                      font-size:25px;
                    font-family:Inter,Arial,Helvetica,sans-serif;">
                                            👥
                                        </div>
                                    </td>
                                    <td style="
                    padding:20px 20px 20px 10px;
                    color:#24364b;
                    font-size:15px;
                    line-height:24px;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        Whether you're procuring laptops for employee onboarding,
                                        expanding your workforce, or refreshing your existing IT
                                        infrastructure,
                                        <strong style="color:#081d3a;font-family:Inter,Arial,Helvetica,sans-serif;">
                                            we're here to help you find the right fit.
                                        </strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Section Heading -->
                    <tr>
                        <td align="center"
                            style="padding:5px 35px 18px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                <tr>
                                    <td align="center" style="
                    padding:12px 18px;
                    background-color:#0b4b91;
                    color:#ffffff;
                    font-size:20px;
                    line-height:26px;
                    font-weight:700;
                    border-radius:7px;
                  font-family:Inter,Arial,Helvetica,sans-serif;">
                                        Why Businesses Choose XtraCover
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Benefits Grid -->
                    <tr>
                        <td style="padding:0 20px 8px 20px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="table-layout:fixed;font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                <tr>
                                    <td align="center" height="150" style="
                    width:33.33%;
                    height:150px;
                    padding:22px 12px 18px 12px;
                    border-right:1px solid #dbe4ef;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#edf5ff; border-radius:50%; font-size:27px; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        💻</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    Certified refurbished<br />laptops for business
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center" height="150" style="
                    width:33.33%;
                    height:150px;
                    padding:22px 12px 18px 12px;
                    border-right:1px solid #dbe4ef;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#eef9f0; border-radius:50%; font-size:27px; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        ₹</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    Save up to 60% on<br />IT procurement cost
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center" height="150" style="
                    width:33.33%;
                    height:150px;
                    padding:22px 12px 18px 12px;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#edf5ff; border-radius:50%; font-size:22px; color:#0b4b91; font-weight:700; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        QC</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    Professionally quality<br />checked through XCQC
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" height="145" style="
                    width:33.33%;
                    height:145px;
                    padding:22px 12px 18px 12px;
                    border-top:1px solid #dbe4ef;
                    border-right:1px solid #dbe4ef;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#eef9f0; border-radius:50%; font-size:27px; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        ✓</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    1-Year Warranty
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center" height="145" style="
                    width:33.33%;
                    height:145px;
                    padding:22px 12px 18px 12px;
                    border-top:1px solid #dbe4ef;
                    border-right:1px solid #dbe4ef;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#edf5ff; border-radius:50%; font-size:25px; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        📍</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    PAN India service network
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center" height="145" style="
                    width:33.33%;
                    height:145px;
                    padding:22px 12px 18px 12px;
                    border-top:1px solid #dbe4ef;
                    box-sizing:border-box;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top" width="33.33%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                            <tr>
                                                <td align="center"
                                                    style="font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    <div
                                                        style="width:55px; height:55px; line-height:55px; background-color:#edf5ff; border-radius:50%; font-size:25px; text-align:center;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                        🎧</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="padding-top:12px; color:#16263c; font-size:14px; line-height:21px; font-weight:600;font-family:Inter,Arial,Helvetica,sans-serif;">
                                                    Dedicated account manager
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Reply Message -->
                    <tr>
                        <td style="padding:16px 35px 24px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                <tr>
                                    <td style="width:58px; padding-top:1px;font-family:Inter,Arial,Helvetica,sans-serif;"
                                        valign="top" width="58">
                                        <div style="
                      width:44px;
                      height:44px;
                      line-height:44px;
                      background-color:#0b4b91;
                      color:#ffffff;
                      border-radius:50%;
                      text-align:center;
                      font-size:20px;
                    font-family:Inter,Arial,Helvetica,sans-serif;">💬</div>
                                    </td>
                                    <td style="
                    color:#44546a;
                    font-size:15px;
                    line-height:24px;
                    padding:0;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="top">
                                        If you have any additional requirements or would like to share more details
                                        before we connect, simply
                                        <strong
                                            style="color:#0b4b91;font-family:Inter,Arial,Helvetica,sans-serif;">reply to
                                            this email.</strong> Our team will be happy to assist you.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Closing Highlight -->
                    <tr>
                        <td style="padding:0 35px 25px 35px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="background-color:#eef8ef; border-radius:10px;font-family:Inter,Arial,Helvetica,sans-serif;"
                                width="100%">
                                <tr>
                                    <td align="center"
                                        style="padding:18px 8px 18px 18px;font-family:Inter,Arial,Helvetica,sans-serif;"
                                        valign="middle" width="65">
                                        <div style="
                      width:48px;
                      height:48px;
                      line-height:48px;
                      background-color:#28a745;
                      color:#ffffff;
                      border-radius:50%;
                      text-align:center;
                      font-size:23px;
                    font-family:Inter,Arial,Helvetica,sans-serif;">
                                            🤝
                                        </div>
                                    </td>
                                    <td style="
                    padding:18px 18px 18px 8px;
                    color:#12335b;
                    font-size:16px;
                    line-height:24px;
                    font-weight:700;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        We look forward to helping your business build a
                                        <span style="color:#24913d;font-family:Inter,Arial,Helvetica,sans-serif;">
                                            smarter and more cost-effective IT infrastructure.
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color:#073c78; padding:25px 30px;font-family:Inter,Arial,Helvetica,sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="font-family:Inter,Arial,Helvetica,sans-serif;" width="100%">
                                <tr>
                                    <td style="
                    color:#ffffff;
                    font-size:12px;
                    line-height:21px;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        <a href="https://xtracover.com/corporate"
                                            style="color:#ffffff; text-decoration:none;font-family:Inter,Arial,Helvetica,sans-serif;">
                                            www.xtracover.com/corporate
                                        </a>
                                    </td>
                                    <td align="center" style="
                    color:#ffffff;
                    font-size:12px;
                    line-height:22px;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        <a href="mailto:karandeep.singh@xtracover.com"
                                            style="color:#ffffff; text-decoration:none;font-family:Inter,Arial,Helvetica,sans-serif;">
                                            karandeep.singh@xtracover.com
                                        </a>
                                    </td>
                                    <td align="right" style="
                    color:#ffffff;
                    font-size:12px;
                    line-height:22px;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        +91 921 218 1545
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" align="center" style="
                    padding-top:12px;
                    color:#ffffff;
                    font-size:12px;
                    line-height:20px;
                  font-family:Inter,Arial,Helvetica,sans-serif;" valign="middle">
                                        A-1, 3rd Floor, FIEE Complex, Okhla Industrial Area, Phase-2, New Delhi, South Delhi, Delhi – 110020, India
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"XtraCover Corporate" <${fromAddress}>`,
      to: quoteData.email,
      bcc: 'ritwik.tiwary@xtracover.com',
      subject: subject,
      html: htmlContent,
      attachments
    })

    console.log(`Customer confirmation email sent successfully to ${quoteData.email} (Message ID: ${info.messageId})`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`Failed to send customer confirmation email to ${quoteData.email}:`, err)
    return { success: false, error: err.message }
  }
}

