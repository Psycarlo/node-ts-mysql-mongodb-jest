import { MongoClient, Db } from 'mongodb'

const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DBNAME

let connection: MongoClient | null = null
let db: Db | null = null

const getDbConnection = async (): Promise<Db> => {
  if (db) {
    return db
  }

  if (!url || !dbName) {
    throw new Error('MongoDB credentials not provided')
  }

  const mongoClient = new MongoClient(url)
  connection = await mongoClient.connect()
  db = connection.db(dbName)
  return db
}

const closeConnection = (): void => {
  if (connection) connection.close()
}

export default { getDbConnection, closeConnection }
