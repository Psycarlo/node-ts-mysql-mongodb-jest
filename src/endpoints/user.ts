import { Request, Response } from 'express'
import mySqlDbAccess, { UserRowDataPacket } from '../lib/mysql'
import mongoDbAccess, { User } from '../lib/mongo'

interface CreateUserBody {
  username: string
  email: string
  hasBitcoin: boolean
}

const insertUserMySQL = async (username: string, email: string) => {
  const result = await mySqlDbAccess.queryInsert(
    `INSERT INTO users (username, email) VALUES (?, ?)`,
    [username, email]
  )
  return result
}

const insertUserInfoMongoDB = async (id: number, hasBitcoin: boolean) => {
  const db = await mongoDbAccess.getDbConnection()
  const result = await db
    .collection<User>('users')
    .insertOne({ _id: id.toString(), hasBitcoin })
  return result
}

const getUserMySQL = async (id: number) => {
  const result = await mySqlDbAccess.queryGet(
    `SELECT * FROM users WHERE id = ?`,
    [id]
  )
  return result
}

const getUserInfoMongoDB = async (id: string) => {
  const db = await mongoDbAccess.getDbConnection()
  const result = await db.collection<User>('users').findOne({ _id: id })
  console.log('Res: ', result)
  return result
}

const post = async (req: Request, res: Response): Promise<void> => {
  const { username, email, hasBitcoin } = req.body as CreateUserBody
  if (!username || !email || !hasBitcoin) {
    res.status(400).json({
      error: 'Invalid Request. Cannot create user without required arguments'
    })
    return
  }
  let mySqlResult
  try {
    mySqlResult = await insertUserMySQL(username, email)
    await insertUserInfoMongoDB(mySqlResult.insertId, hasBitcoin)
  } catch (e) {
    res.status(500).json({
      error: 'Error adding user in the database'
    })
  }
  res.status(200).json(mySqlResult?.insertId)
}

const getOne = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  if (!id) {
    res.status(400).json({
      error: 'Invalid Request. Cannot create user without required arguments'
    })
    return
  }
  let mySqlResult, mongoResult
  try {
    mySqlResult = await getUserMySQL(id)
    mongoResult = await getUserInfoMongoDB(id.toString())
    console.log(mySqlResult, mongoResult)
  } catch (e) {
    res.status(500).json({
      error: 'Error getting user from the database'
    })
  }

  if (!mongoResult) {
    res.status(500).json({
      error: 'Error fetching user info from the database'
    })
  }

  res.status(200).json({
    hasBitcoin: mongoResult?.hasBitcoin
  })
}

export default {
  post,
  getOne
}
