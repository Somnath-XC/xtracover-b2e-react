import mssql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Required for AWS RDS MSSQL connection
    trustServerCertificate: true, // Bypasses self-signed certificate issues on cloud RDS
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

let poolPromise = null

export async function getDbPool() {
  if (!poolPromise) {
    console.log(`Connecting to Microsoft SQL Server RDS at ${dbConfig.server}:${dbConfig.port}...`)
    poolPromise = new mssql.ConnectionPool(dbConfig)
      .connect()
      .then((pool) => {
        console.log(`Connected successfully to MSSQL database "${dbConfig.database}".`)
        return pool
      })
      .catch((err) => {
        poolPromise = null
        console.error('MSSQL Database connection error:', err)
        throw err
      })
  }
  return poolPromise
}

export { mssql }
