import * as dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config({ path: `.env.${process.env.NODE_ENV?.trim()}` })

interface OkPacket {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Records = Record<string, any>[]

const database = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  ...(process.env.MYSQL_PORT
    ? { port: parseInt(process.env.MYSQL_PORT) }
    : null),
  ...(process.env.MYSQL_USER ? { user: process.env.MYSQL_USER } : null),
  ...(process.env.MYSQL_PASSWORD
    ? { password: process.env.MYSQL_PASSWORD }
    : null),
  database: process.env.MYSQL_DATABASE || 'psycarlo',
  charset: 'utf8mb4',
  timezone: 'UTC'
})

const connect = (): Promise<mysql.PoolConnection> => {
  return new Promise((resolve, reject) => {
    database.getConnection((err, conn) => {
      if (err) {
        reject(err)
      }
      resolve(conn)
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryInsert = (query: string, values?: any[]): Promise<OkPacket> => {
  return new Promise((resolve, reject) => {
    connect().then((conn) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      conn.query(query, values, (err, results: any) => {
        conn.release()
        if (err) {
          const e = new Error()
          e.name = err.name
          e.message = err.message
          reject(e)
        }
        resolve(results)
      })
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryGet = (query: string, values?: any[]): Promise<Records> => {
  return new Promise((resolve, reject) => {
    connect().then((conn) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      conn.query(query, values, (err, results: any) => {
        conn.release()
        if (err) {
          const e = new Error()
          e.name = err.name
          e.message = err.message
          reject(e)
        }
        resolve(results)
      })
    })
  })
}

export { queryInsert, queryGet }

const mySqlDbAccess = { queryInsert, queryGet }

export default mySqlDbAccess
