import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Manually parse .env to avoid any module timing issue
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')
const envFile = readFileSync(envPath, 'utf8')
const env = {}
envFile.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) {
    env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '')
  }
})

console.log('SMTP Config:')
console.log('  HOST:', env.SMTP_HOST)
console.log('  PORT:', env.SMTP_PORT)
console.log('  USER:', env.SMTP_USERNAME)
console.log('  FROM:', env.SMTP_FROM_ADDRESS)
console.log('  TO  :', env.NOTIFICATION_RECIPIENT_EMAIL)

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT, 10),
  secure: false,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD
  }
})

console.log('\nVerifying SMTP connection...')
transporter.verify((err, success) => {
  if (err) {
    console.error('SMTP Verify FAILED:', err.message)
    console.error('Full error:', err)
  } else {
    console.log('SMTP connection VERIFIED successfully!')
    console.log('\nSending test email...')
    transporter.sendMail({
      from: `"XtraCover B2E" <${env.SMTP_FROM_ADDRESS}>`,
      to: env.NOTIFICATION_RECIPIENT_EMAIL,
      subject: '[TEST] XtraCover B2E Email Notification Test',
      html: '<p>This is a test email to verify the AWS SES SMTP configuration is working correctly.</p>'
    }).then(info => {
      console.log('Test email sent! Message ID:', info.messageId)
      console.log('Response:', info.response)
    }).catch(err => {
      console.error('Test email FAILED:', err.message)
      console.error('Full error:', err)
    })
  }
})
