import { Player } from './models.js'

export interface Guess {
  nickname: Player['nickname']
  text: string
  id: Player['id']
  isCorrect: boolean
}
