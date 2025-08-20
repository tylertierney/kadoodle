import { randNumber } from '@ngneat/falso'
import { mockPlayer, Player } from './models.js'
import { generateRoomCode } from './room-code.js'
import { Turn } from './turn.js'
import { words } from './words.js'

export class Room {
  constructor(partial?: Partial<Room> & { roomCode: string }) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  roomCode = ''
  players: Player[] = []
  turns: Turn[] = []
  possibleArtists: Player[] = []
  wordList: string[] = [...words]

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

export const mockRoom = (): Room => {
  const room = new Room({ roomCode: generateRoomCode() })
  const players = Array(randNumber({ min: 1, max: 5 }))
    .fill(0)
    .map(mockPlayer)
  room.players = players
  room.possibleArtists = players
  return room
}
