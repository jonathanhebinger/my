import express, { Request, Response } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'

import getAuthExtension from './extensions/getAuth'
import getUserExtension from './extensions/getUser'
import './routers/auth'
import './routers/notebook'
import './routers/notebookNote'
import './routers/notebookUser'
import './routers/user'
import { actionBus } from './action'

export const app = express()

getAuthExtension(app)
getUserExtension(app)

app.use(cors())
app.use(express.json())
app.post('/api', async (req: Request, res: Response) => {
  try {
    console.log(req.body)

    const payload = await actionBus.execute(req.body.name, req.body.data, req)

    if ('result' in payload) {
      console.log(req.body.name, payload.result)
      res.status(200).send(payload.result)
    } else {
      console.log(req.body.name, payload.error)
      res.status(400).send(payload.error)
    }
  } catch (error) {
    if (error.message === 'Not authentified') {
      res.status(401).send({ error })
    } else {
      res.status(400).send({ error })
    }
  }
})
app.use(err => console.log(err))

const initializeConfig = async () => {
  try {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

    await connect('mongodb://127.0.0.1:27017/my')
    console.log('Connected to MongoDb')
  } catch (error) {
    console.log(error)
  }
}

const PORT = process.env.NODE_DOCKER_PORT || 5000

export const server = app.listen(PORT, async () => {
  await initializeConfig()
  console.log(`Server is running on port ${PORT}`)
})
