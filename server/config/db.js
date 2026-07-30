import mssql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  user: process.env.SQL_SERVER_USER,
  password: process.env.SQL_SERVER_PASSWORD,
  server: process.env.SQL_SERVER_HOST,
  port: parseInt(process.env.SQL_SERVER_PORT || '1433', 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Off for on-premise / private IP server
    trustServerCertificate: true,
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
    console.log(`Connecting to SQL Server at ${dbConfig.server}:${dbConfig.port}...`)
    poolPromise = new mssql.ConnectionPool(dbConfig)
      .connect()
      .then((pool) => {
        console.log(`Connected successfully to database "${dbConfig.database}".`)
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
