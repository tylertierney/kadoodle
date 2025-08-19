import dotenv from 'dotenv'
import express from 'express'
import * as path from 'path'
import { Server } from 'socket.io'

dotenv.config({ path: __dirname + '/.env' })

const app = express()

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to backend!' })
})

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

const io = new Server(server, {
  path: '/api',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  console.log('someone connected')

  socket.on('clicked', message => {
    console.log(message)
  })
})

server.on('error', console.error)
