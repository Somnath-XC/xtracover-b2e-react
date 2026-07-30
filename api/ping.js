// Minimal diagnostic - no dependencies at all
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: {
      DB_SERVER: !!process.env.DB_SERVER,
      DB_NAME: !!process.env.DB_NAME,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      JWT_SECRET: !!process.env.JWT_SECRET,
      SMTP_HOST: !!process.env.SMTP_HOST
    }
  })
}
