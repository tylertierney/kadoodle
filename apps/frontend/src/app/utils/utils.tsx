import { RefObject } from 'react'

export const getLocalStorage = (
  key?: 'currentPlayer' | 'gameStage' | 'ipAddress' | 'players' | 'turns',
) => {
  let existingGame = null
  const gameFromLocal = localStorage.getItem('doodle-context')
  if (!gameFromLocal) return
  existingGame = JSON.parse(gameFromLocal)
  if (key) {
    return existingGame[key]
  }
  return existingGame
}

export const getLetterValue = (letter: string, word: string, index: number) => {
  word = word.toLowerCase()
  letter = letter.toLowerCase()
  let result = 'inherit'
  if (word.includes(letter)) {
    result = 'var(--light-orange)'
    if (word[index] === letter) {
      result = 'green'
    }
  }
  return result
}

export const renderVideo = (
  stream: MediaStream,
  ref: RefObject<HTMLVideoElement | null>,
) => {
  if (ref.current) {
    ref.current.srcObject = stream
  }
}

export const getNumberSuffix = (number: number) => {
  let lastNumber = String(number)
  lastNumber = lastNumber[lastNumber.length - 1]

  switch (lastNumber) {
    case '1':
      return 'st'
    case '2':
      return 'nd'
    case '3':
      return 'rd'
    default:
      return 'th'
  }
}
