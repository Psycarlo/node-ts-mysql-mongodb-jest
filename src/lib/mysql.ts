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

type Records = Record<string, any>[]

// TODO: Defaults are set for testing.
// TODO: Create an if for process.env.NODE_ENV === 'tests'
const database = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  ...(process.env.MYSQL_PORT
    ? { port: parseInt(process.env.MYSQL_PORT) }
    : { port: 3306 }),
  ...(process.env.MYSQL_USER
    ? { user: process.env.MYSQL_USER }
    : { user: 'psycarlo' }),
  ...(process.env.MYSQL_PASSWORD
    ? { password: process.env.MYSQL_PASSWORD }
    : { password: 'bitcoinislove' }),
  database: process.env.MYSQL_DATABASE || 'mysqltests',
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

// TODO: Refactor queryInsert + queryGet + queryUpdate into one?
const queryInsert = (query: string, values?: any[]): Promise<OkPacket> => {
  return new Promise((resolve, reject) => {
    connect().then((conn) => {
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

const queryGet = (query: string, values?: any[]): Promise<Records> => {
  return new Promise((resolve, reject) => {
    connect().then((conn) => {
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

const queryUpdate = (query: string, values?: any[]): Promise<Records> => {
  return new Promise((resolve, reject) => {
    connect().then((conn) => {
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

export { queryInsert, queryGet, queryUpdate }

const mySqlDbAccess = { queryInsert, queryGet, queryUpdate }

export default mySqlDbAccess
