import { randBoolean, randUserName, randUuid, randWord } from '@ngneat/falso'
import { Player } from './models.js'

export interface Guess {
  nickname: Player['nickname']
  text: string
  id: Player['id']
  isCorrect: boolean
}

export const mockGuess = (partial?: Partial<Guess>): Guess => ({
  nickname: randUserName(),
  text: randWord(),
  id: randUuid(),
  isCorrect: randBoolean(),
  ...partial,
})
