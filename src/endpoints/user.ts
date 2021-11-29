import { Request, Response } from 'express'
import mySqlDbAccess from '../lib/mysql'

interface CreateUserBody {
  username: string
  email: string
  hasBitcoin: boolean
}

const insertUserMySQL = async (username: string, email: string) => {
  const id = await mySqlDbAccess.query(
    `INSERT INTO users (username, email) VALUES (?, ?)`,
    [username, email]
  )
}

const insertUserInfoMongoDB = async (id: number, hasBitcoin: boolean) => {
  console.log(id, hasBitcoin)
}

const post = async (req: Request, res: Response): Promise<void> => {
  const { username, email, hasBitcoin } = req.body as CreateUserBody
  if (!username || !email || !hasBitcoin) {
    res.status(400).send({
      error: 'Invalid Request. Cannot create user without required arguments'
    })
    return
  }
  // TODO: Add User to MYSQL
  // TODO: Add User Info to MongoDB
  // TODO: Return id
  console.log('-')
}

const getOne = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  if (!id) {
    res.status(400).send({ error: 'Invalid Request' })
    return
  }
  // TODO: Get User from MYSQL
  // TODO: Get User Info from MongoDB
  // TODO: Return data
  console.log('-')
}

export default {
  post,
  getOne
}
