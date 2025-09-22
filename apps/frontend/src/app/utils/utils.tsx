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

export const randColor = () => {
  const randInt = () => ~~(Math.random() * 256)
  return `rgb(${randInt()}, ${randInt()}, ${randInt()})`
}

export const mockMediastream = (): MediaStream => {
  const stream = new MediaStream()

  const canvas = document.createElement('canvas')
  canvas.width = 24
  canvas.height = 24

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const color = randColor()
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let r = 0
  while (r < canvas.height) {
    let c = 0
    while (c < canvas.width) {
      const color = randColor()
      ctx.fillStyle = color
      ctx.fillRect(r, c, 1, 1)
      c++
    }
    r++
  }

  const fakeTrack = canvas.captureStream().getVideoTracks()[0]
  stream.addTrack(fakeTrack)

  return stream
}
