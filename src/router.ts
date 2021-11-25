import { Router } from 'express'
import { user } from './endpoints'

const router = Router()

router.get('/user/:id', user.getOne)

router.post('/user', user.post)

export default router
