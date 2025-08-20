import { Guess } from './guess.js'
import { Player } from './models.js'

const getRandomItemsFromArr = <T>(options: {
  numberToGet: number
  arr: Array<T>
}): Array<T> => {
  const { numberToGet, arr } = options

  const res: T[] = []

  for (let i = 0; i < numberToGet; i++) {
    const index = Math.floor(Math.random() * arr.length)
    res.push(arr[index])
    arr.splice(index, 1)
  }

  return res
}

export class Turn {
  constructor(
    artist: Player,
    wordList: string[] = [],
    partial?: Partial<Turn>,
  ) {
    this.artist = artist
    this.possibleWords = getRandomItemsFromArr({
      arr: wordList,
      numberToGet: 3,
    })

    if (partial) {
      Object.assign(this, partial)
    }
  }

  artist!: Player
  word = ''
  drawing = ''
  guesses: Guess[] = []
  active = true
  possibleWords: string[] = []
  pointsThisTurn: Record<Player['nickname'], number> = {}
  lastTurn = false
  timeRemaining = 90

  setWord(word: string) {
    this.word = word
  }

  addGuess(guess: Guess) {
    this.guesses.push(guess)
  }

  get numOfCorrectGuesses(): number {
    return this.guesses.reduce((acc, curr) => acc + Number(curr.isCorrect), 0)
  }

  checkIfPlayerHasAlreadyScored(playerId: Player['id']) {
    for (const guess of this.guesses) {
      if (guess.isCorrect && guess.id === playerId) {
        return true
      }
    }
    return false
  }

  draw(drawingData: string) {
    this.drawing = drawingData
  }

  addPointsThisTurn(guess: Guess, pointsToAdd: number) {
    this.pointsThisTurn[guess.nickname] = pointsToAdd
  }

  checkWhetherToEndRound(numOfPlayers: number) {
    const lengthOfScoringPlayers = Object.entries(this.pointsThisTurn).length
    if (lengthOfScoringPlayers === numOfPlayers - 1) {
      return true
    }

    return false
  }
}
