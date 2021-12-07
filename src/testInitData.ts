import mySqlDbAccess from './lib/mysql'
import mongoDbAccess from './lib/mongo'

interface Test {
  _id: string
  info: string
}

const getMySQLInitData = async () => {
  return mySqlDbAccess.queryGet(`SELECT * FROM test WHERE id = 1`)
}

const getMongoDBInitData = async () => {
  const db = await mongoDbAccess.getDbConnection()
  const result = await db
    .collection<Test>('test')
    .findOne({ info: 'myTestInfo' })
  return result
}

export default { getMySQLInitData, getMongoDBInitData }
