const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

let sharedData = {
  code: '',
  language: 'Go',
  fontSize: 14,
  showLineNumbers: true,
  wordWrap: false,
  history: [],
}

io.on('connection', (socket) => {
  socket.emit('init', sharedData)

  socket.on('update', (data) => {
    sharedData = { ...sharedData, ...data }
    io.emit('update', sharedData)
  })

  socket.on('publish', (item) => {
    sharedData.history.unshift(item)
    io.emit('update', sharedData)
  })

  socket.on('delete', (id) => {
    sharedData.history = sharedData.history.filter(i => i.id !== id)
    io.emit('update', sharedData)
  })

  socket.on('clear', () => {
    sharedData.history = []
    io.emit('update', sharedData)
  })
})

app.use(express.static('dist'))

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
}) 