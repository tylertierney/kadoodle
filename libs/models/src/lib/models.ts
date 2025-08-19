import {
  randAnimal,
  randBoolean,
  randColor,
  randFullName,
  randNumber,
  randUuid,
  randWord,
} from '@ngneat/falso'

export interface CharacterObj {
  name: string
  icon: string
  color: string
  isSelected: boolean
}

export const characters: CharacterObj[] = [
  { name: 'camel', icon: '', color: 'lightgreen', isSelected: true },
  { name: 'deer', icon: '', color: '#afbff2', isSelected: false },
  { name: 'dog', icon: '', color: '#aff2af', isSelected: false },
  { name: 'elephant', icon: '', color: '#aff2e8', isSelected: false },
  { name: 'gorilla', icon: '', color: '#f2afd9', isSelected: false },
  { name: 'hippo', icon: '', color: '#d9aff2', isSelected: false },
  { name: 'koala', icon: '', color: '#fcfba2', isSelected: false },
  { name: 'lion', icon: '', color: '#99ffce', isSelected: false },
  { name: 'panda', icon: '', color: '#ff99bc', isSelected: false },
  { name: 'pig', icon: '', color: '#cd99ff', isSelected: false },
  { name: 'rhino', icon: '', color: '#fcc9a2', isSelected: false },
  { name: 'tiger', icon: '', color: '#abf1ff', isSelected: false },
  { name: 'zebra', icon: '', color: '#c9abff', isSelected: false },
]

export const mockCharacterObj = (
  partial?: Partial<CharacterObj>,
): CharacterObj => ({
  name: randAnimal(),
  icon: '',
  color: randColor(),
  isSelected: false,
  ...partial,
})

export interface Player {
  nickname: string
  selectedCharacter: CharacterObj
  isVIP: boolean
  id: string
  peerId: string
  usingMedia: boolean
  stream?: MediaStream
  points: number
}

export const mockPlayer = (partial?: Partial<Player>): Player => ({
  nickname: randFullName(),
  selectedCharacter: mockCharacterObj(),
  isVIP: randBoolean(),
  id: randUuid(),
  peerId: randUuid(),
  usingMedia: randBoolean(),
  stream: undefined,
  points: randNumber({ min: 100, max: 1000 }),
  ...partial,
})

export interface Turn {
  word: string
  drawing: string
  artist: Player
  guesses: string[]
  active: boolean
  possibleWords: string[]
  pointsThisTurn: {
    [key: string]: number
  }
  lastTurn: boolean
}

export const mockTurn = (partial?: Partial<Turn>): Turn => ({
  word: randWord(),
  drawing: '',
  artist: mockPlayer(),
  guesses: Array(randNumber({ min: 1, max: 10 }))
    .fill(null)
    .map(() => randWord()),
  active: randBoolean(),
  possibleWords: Array(3)
    .fill(null)
    .map(() => randWord()),
  pointsThisTurn: {},
  lastTurn: randBoolean(),
  ...partial,
})
