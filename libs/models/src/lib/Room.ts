import { randNumber, randUuid, randWord } from '@ngneat/falso'
import { Guess } from './guess.js'
import { mockPlayer, Player } from './models.js'
import { generateRoomCode } from './room-code.js'
import { Turn } from './turn.js'
import { words } from './words.js'

export class Room {
  roomCode = ''
  players: Player[] = []
  turns: Turn[] = []
  possibleArtists: Player[] = []
  wordList: string[] = [...words]

  constructor(partial?: Partial<Room> & { roomCode: string }) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  addPlayer(player: Player) {
    this.players.push(player)
    this.possibleArtists.push(player)
  }

  addTurn(turn: Turn) {
    this.turns.push(turn)
  }

  get currentTurn() {
    return this.turns.at(-1) as Turn
  }

  getRandomArtist() {
    const randomIndex = ~~(Math.random() * this.possibleArtists.length)
    return this.possibleArtists.splice(randomIndex, 1)[0]
  }

  addPointsToPlayer(playerId: Player['id'], pointsToAdd: number) {
    for (const player of this.players) {
      if (player.id === playerId) {
        player.points += pointsToAdd
      }
    }
  }

  restartGame() {
    this.turns = []
    this.wordList = [...words]
    for (const player of this.players) {
      player.points = 0
    }
    this.possibleArtists = [...this.players]
  }
}

export const mockRoom = (partial?: Partial<Room>): Room => {
  const room = new Room({ roomCode: generateRoomCode(), ...partial })
  const players = Array(randNumber({ min: 4, max: 13 }))
    .fill(0)
    .map(() => mockPlayer({ isVIP: false }))
  room.players = [...players]
  room.possibleArtists = [...players]

  ///////

  let i = 0
  while (i < players.length / 2) {
    const artist = room.getRandomArtist()
    const turn = new Turn(artist, room.wordList)
    room.addTurn(turn)

    turn.setWord(turn.possibleWords[0])

    Array(randNumber({ min: 1, max: 30 }))
      .fill(null)
      .map((): Guess => {
        const player = players[~~(Math.random() * players.length)]
        return {
          id: randUuid(),
          isCorrect: false,
          nickname: player.nickname,
          text: randWord(),
        }
      })
      .forEach(guess => turn.addGuess(guess))

    players.forEach(player => {
      const points = randNumber({ min: 10, max: 160 })
      room.addPointsToPlayer(player.id, points)
      turn.addPointsThisTurn({ nickname: player.nickname } as Guess, points)
    })
    i++
  }

  /////

  return room
}
