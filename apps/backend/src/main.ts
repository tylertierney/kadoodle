import { Guess, Player, Room, Turn } from '@kadoodle/models'
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

const rooms: Room[] = []

const getRoom = (roomCode: string) => {
  return rooms.find(room => room.roomCode === roomCode)
}

io.on('connection', socket => {
  console.log('someone connected')

  socket.on('draw', (drawingData: string, roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    room.currentTurn.draw(drawingData)
    io.to(roomCode).emit('draw', drawingData, room.turns)
  })

  socket.on('createLobby', (playerObj, roomCode) => {
    const newRoom = new Room({ roomCode })
    newRoom.addPlayer(playerObj)
    rooms.push(newRoom)
    socket.join(roomCode)
    io.to(roomCode).emit('createLobby', newRoom.players)
  })

  socket.on('checkIfRoomExists', (roomCode: string) => {
    const room = getRoom(roomCode)
    socket.emit('checkIfRoomExists', Boolean(room))
  })

  socket.on('joinLobby', (playerObj: Player, roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    room.addPlayer(playerObj)
    socket.join(roomCode)
    io.to(roomCode).emit('joinLobby', room.players, roomCode)
  })

  socket.on('selectWord', (word: string, roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    const currentTurn = room.currentTurn
    let time = 90

    if (room.players.length === 1) {
      currentTurn.lastTurn = true
    }

    const handleTimer = setInterval(() => {
      time--
      if (time === 0) {
        currentTurn.active = false
        io.to(roomCode).emit('endTurn', room.turns)
        io.to(roomCode).emit('setTimer', 90)
        clearInterval(handleTimer)
        return
      }
      if (!currentTurn.active) {
        io.to(roomCode).emit('setTimer', 90)
        clearInterval(handleTimer)
        return
      }
      if (time > -1) {
        currentTurn.timeRemaining = time
        io.to(roomCode).emit('setTimer', time)
      }
    }, 1000)

    currentTurn.setWord(word)
    io.to(roomCode).emit('selectWord', room.turns)
  })

  socket.on('startGame', (roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    const firstTurnArtist = room.getRandomArtist()
    const turnObj = new Turn(firstTurnArtist, room.wordList)
    room.addTurn(turnObj)
    io.to(roomCode).emit('startGame', room.turns, room.players)
  })

  socket.on('startTurn', (roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    const artist = room.getRandomArtist()
    const turnObj = new Turn(artist, room.wordList)
    if (room.turns.length >= room.players.length - 1) {
      turnObj.lastTurn = true
    }
    room.addTurn(turnObj)
    io.to(roomCode).emit('startTurn', room.turns)
  })

  socket.on('guess', (guess: Guess, roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    const currentTurn = room.currentTurn
    const addPoints = !currentTurn.checkIfPlayerHasAlreadyScored(guess.id)
    currentTurn.addGuess(guess)

    if (guess.isCorrect) {
      const pointsToAdd =
        Math.floor(75 / currentTurn.numOfCorrectGuesses) +
        currentTurn.timeRemaining
      if (addPoints) {
        room.addPointsToPlayer(guess.id, pointsToAdd)
        currentTurn.addPointsThisTurn(guess, pointsToAdd)
        if (currentTurn.checkWhetherToEndRound(room.players.length)) {
          io.to(roomCode).emit('endTurn', room.turns)
          currentTurn.active = false
        }
        io.to(roomCode).emit('addedPoints', room.players)
      }
    }
    io.to(roomCode).emit('guess', guess, room.turns)
  })

  socket.on('getCurrentGame', (roomCode: string) => {
    const room = getRoom(roomCode)
    socket.join(roomCode)
    io.to(roomCode).emit('getCurrentGame', room)
  })

  socket.on('endGame', (roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) {
      io.to(roomCode).emit('endGame')
      socket.emit('endGame')
      return
    }

    const currentTurn = room.currentTurn
    if (currentTurn) {
      currentTurn.active = true
    }
    room.turns = []
    room.players = []
    io.to(roomCode).emit('endGame')
  })

  socket.on('restartGame', (roomCode: string) => {
    const room = getRoom(roomCode)
    if (!room) return
    room.restartGame()
    const firstTurnArtist = room.getRandomArtist()
    const turnObj = new Turn(firstTurnArtist, room.wordList)
    room.addTurn(turnObj)
    io.to(roomCode).emit('startGame', room.turns, room.players)
  })
})

server.on('error', console.error)
