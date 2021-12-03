import { Request, Response } from 'express'
import mySqlDbAccess from '../lib/mysql'
import mongoDbAccess, { User } from '../lib/mongo'

interface CreateUserBody {
  username: string
  email: string
  hasBitcoin: boolean
}

interface UpdateUserResponse {
  id?: number
  username?: string
  email?: string
  hasBitcoin?: boolean
}

const insertUserMySQL = async (username: string, email: string) => {
  const result = await mySqlDbAccess.queryInsert(
    `INSERT INTO users (username, email) VALUES (?, ?)`,
    [username, email]
  )
  return result
}

const insertUserInfoMongoDB = async (id: string, hasBitcoin: boolean) => {
  const db = await mongoDbAccess.getDbConnection()
  const result = await db
    .collection<User>('users')
    .insertOne({ _id: id, hasBitcoin })
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
  return result
}

const patchUserMySQL = async (id: number, username: string, email: string) => {
  const result = await mySqlDbAccess.queryUpdate(
    `UPDATE users SET username = ?, email = ? WHERE id = ?`,
    [username, email, id]
  )
  return result
}

const patchUserInfoMongoDB = async (id: string, hasBitcoin: boolean) => {
  const db = await mongoDbAccess.getDbConnection()
  const result = await db
    .collection<User>('users')
    .updateOne({ _id: id }, { hasBitcoin })
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
    await insertUserInfoMongoDB(mySqlResult.insertId.toString(), hasBitcoin)
  } catch (e) {
    console.log('ERR: ', e)
    res.status(500).json({
      error: 'Error adding user in the database'
    })
    return
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
  } catch (e) {
    res.status(500).json({
      error: 'Error getting user from the database'
    })
    return
  }

  if (!mongoResult) {
    res.status(500).json({
      error: 'Error fetching user info from the database'
    })
    return
  }

  res.status(200).json({
    id: mySqlResult[0].id,
    username: mySqlResult[0].username,
    email: mySqlResult[0].email,
    hasBitcoin: mongoResult?.hasBitcoin
  })
}

const patch = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)

  if (!id) {
    res.status(400).json({
      error: 'Invalid Request. User id is required'
    })
    return
  }

  const { username, email, hasBitcoin } = req.body as CreateUserBody

  // TODO hasBitcoin is boolean - do I need to verify type instead?
  if (!username && !email && !hasBitcoin) {
    res.status(400).json({
      error: 'Invalid Request. Cannot update user without required arguments'
    })
    return
  }

  const jsonResponse = {} as UpdateUserResponse

  if (username || email) {
    try {
      await patchUserMySQL(id, username, email)
      if (username) jsonResponse.username = username
      if (email) jsonResponse.email = email
    } catch (e) {
      res.status(500).json({
        error: 'Error updating user'
      })
      return
    }
  }

  if (typeof hasBitcoin === 'boolean') {
    try {
      await patchUserInfoMongoDB(id.toString(), hasBitcoin)
      jsonResponse.hasBitcoin = hasBitcoin
    } catch (e) {
      res.status(500).json({
        error: 'Error updating user info'
      })
      return
    }
  }
  res.status(200).json(jsonResponse)
}

export default {
  post,
  getOne,
  patch
}
