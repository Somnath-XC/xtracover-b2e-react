// Direct integration test: submit quote + wait for email result
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'

// Load .env manually
const __dirname = dirname(fileURLToPath(import.meta.url))
const envFile = readFileSync(resolve(__dirname, '../.env'), 'utf8')
envFile.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) return
  const key = trimmed.slice(0, eqIdx).trim()
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
  process.env[key] = val
})

console.log('=== ENV VARS CHECK ===')
console.log('SMTP_HOST:', process.env.SMTP_HOST)
console.log('SMTP_PORT:', process.env.SMTP_PORT)
console.log('SMTP_USERNAME:', process.env.SMTP_USERNAME)
console.log('SMTP_FROM_ADDRESS:', process.env.SMTP_FROM_ADDRESS)
console.log('NOTIFICATION_RECIPIENT_EMAIL:', process.env.NOTIFICATION_RECIPIENT_EMAIL)
console.log('')

const { sendNewInquiryNotification } = await import('./services/emailService.js')

console.log('=== SENDING EMAIL (AWAITED) ===')
const result = await sendNewInquiryNotification({
  requestId: 'REQ-TEST-001',
  name: 'Jatin Singh',
  contact: '+91 98765 43210',
  email: 'jatin.singh@xtracover.com',
  message: 'Direct integration test — checking email delivery to admin.'
})

console.log('Email result:', result)
process.exit(result.success ? 0 : 1)
