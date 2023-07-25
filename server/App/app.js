import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import fileUpload from 'express-fileupload'
import userRouter from '../routes/users.routes.js'
import postRouter from '../routes/posts.routes.js'
import socialRouter from '../routes/social.routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

let USERS_CONNECTED = []
const app = express()

const httpServer = createServer(app)

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors({ origin: 'http://localhost:5173' }))

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
})

io.on('connection', (socket) => {
  socket.on('login', (userId) => {
    USERS_CONNECTED.push({ socketId: socket.id, userId })
  })

  socket.on('logout', (userId) => {
    USERS_CONNECTED = USERS_CONNECTED.filter((user) => user.userId !== userId)
  })

  socket.on('notification', (userId) => {
    const userIndex = USERS_CONNECTED.findIndex(
      (user) => user.userId === userId
    )
    if (userIndex !== -1) {
      io.to(USERS_CONNECTED[userIndex].socketId).emit('notification')
      io.to(USERS_CONNECTED[userIndex].socketId).emit('notificationC')
      return
    }
  })

  socket.on('disconnect', () => {
    USERS_CONNECTED = USERS_CONNECTED.filter(
      (user) => user.socketId !== socket.id
    )
  })
})

app.use(express.json())

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
  })
)

app.use('/api', postRouter, userRouter, socialRouter)

app.use(express.static(join(__dirname, '../../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'))
})

export default httpServer
