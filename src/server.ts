import express from 'express'
import cors from 'cors'
import router from './router'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// TODO: router
app.use('/api', router)

app.get('*', (_req: express.Request, res: express.Response) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
