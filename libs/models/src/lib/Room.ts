import { Player, Turn } from './models.js'

class Room {
  constructor(roomCode: string, partial?: Partial<Room>) {
    if (partial) {
      Object.assign(this, partial)
    }

    this.roomCode = roomCode
  }

  roomCode = ''
  players: Player[] = []
  turns: Turn[] = []
  possibleArtist: Player[] = []
  wordList: any[] = []
}
