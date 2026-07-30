import { getDbPool, mssql } from './db.js'
import bcrypt from 'bcryptjs'

export async function initializeDatabaseSchema() {
  try {
    const pool = await getDbPool()

    // 1. Create AdminUsers table if not exists
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AdminUsers')
      BEGIN
          CREATE TABLE AdminUsers (
              Id INT IDENTITY(1,1) PRIMARY KEY,
              Email NVARCHAR(255) UNIQUE NOT NULL,
              PasswordHash NVARCHAR(255) NOT NULL,
              Name NVARCHAR(255) NOT NULL,
              Role NVARCHAR(100) DEFAULT 'Super Admin',
              CreatedAt DATETIME DEFAULT GETDATE()
          );
          PRINT 'AdminUsers table created.';
      END
    `)

    // 2. Create BusinessQuotes table if not exists
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BusinessQuotes')
      BEGIN
          CREATE TABLE BusinessQuotes (
              Id INT IDENTITY(1,1) PRIMARY KEY,
              RequestId NVARCHAR(50) UNIQUE NOT NULL,
              Name NVARCHAR(255) NOT NULL,
              Contact NVARCHAR(50) NOT NULL,
              Email NVARCHAR(255) NOT NULL,
              Message NVARCHAR(MAX) NOT NULL,
              Status NVARCHAR(50) DEFAULT 'New Inquiry',
              SubmittedAt DATETIME DEFAULT GETDATE()
          );
          PRINT 'BusinessQuotes table created.';
      END
    `)

    // 3. Seed initial admin user if not already present
    const defaultEmail = 'admin@xtracover.com'
    const adminCheck = await pool
      .request()
      .input('email', mssql.NVarChar, defaultEmail)
      .query(`SELECT TOP 1 * FROM AdminUsers WHERE Email = @email`)

    if (adminCheck.recordset.length === 0) {
      const defaultPassword = 'Enterprise@2026!'
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(defaultPassword, salt)

      await pool
        .request()
        .input('email', mssql.NVarChar, defaultEmail)
        .input('passwordHash', mssql.NVarChar, hashedPassword)
        .input('name', mssql.NVarChar, 'Jatin Singh')
        .input('role', mssql.NVarChar, 'Super Admin')
        .query(`
          INSERT INTO AdminUsers (Email, PasswordHash, Name, Role)
          VALUES (@email, @passwordHash, @name, @role)
        `)

      console.log(`Seeded initial admin user "${defaultEmail}" into MSSQL database.`)
    } else {
      console.log(`Admin user "${defaultEmail}" exists in MSSQL database.`)
    }

    console.log('MSSQL database schema initialization complete.')
  } catch (err) {
    console.error('Error initializing MSSQL database schema:', err)
  }
}
