import { Guess } from './guess.js'
import { Player } from './models.js'
import { Room } from './room.js'
import { Turn } from './turn.js'

export interface ClientToServerEvents {
  draw: (drawingData: string, roomCode: string) => void
  createLobby: (player: Player, roomCode: string) => void
  checkIfRoomExists: (roomCode: string) => void
  joinLobby: (player: Player, roomCode: string) => void
  selectWord: (word: string, roomCode: string) => void
  startGame: (roomCode: string) => void
  startTurn: (roomCode: string) => void
  guess: (guess: Guess, roomCode: string) => void
  getCurrentGame: (roomCode: string) => void
  endGame: (roomCode: string) => void
  restartGame: (roomCode: string) => void
  leaveGame: (roomCode: string, player: Player) => void
}

export interface ServerToClientEvents {
  draw: (drawingData: string, turns: Turn[]) => void
  createLobby: (players: Player[]) => void
  checkIfRoomExists: (exists: boolean) => void
  joinLobby: (players: Player[], roomCode: string) => void
  selectWord: (turns: Turn[]) => void
  endTurn: (turns: Turn[]) => void
  setTimer: (time: number) => void
  startGame: (turns: Turn[], players: Player[]) => void
  startTurn: (turns: Turn[]) => void
  guess: (guess: Guess, turns: Turn[]) => void
  addedPoints: (players: Player[]) => void
  getCurrentGame: (room: Room | undefined) => void
  endGame: () => void
  leaveGame: (player: Player, players: Player[]) => void
}
