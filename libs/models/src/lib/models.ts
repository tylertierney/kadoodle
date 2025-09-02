import { randBoolean, randNumber, randUserName, randUuid } from '@ngneat/falso'

export interface CharacterObj {
  name: string
  color: string
  isSelected: boolean
}

export const characters: CharacterObj[] = [
  { name: 'camel', color: 'lightgreen', isSelected: true },
  { name: 'deer', color: '#afbff2', isSelected: false },
  { name: 'dog', color: '#aff2af', isSelected: false },
  { name: 'elephant', color: '#aff2e8', isSelected: false },
  { name: 'gorilla', color: '#f2afd9', isSelected: false },
  { name: 'hippo', color: '#d9aff2', isSelected: false },
  { name: 'koala', color: '#fcfba2', isSelected: false },
  { name: 'lion', color: '#99ffce', isSelected: false },
  { name: 'panda', color: '#ff99bc', isSelected: false },
  { name: 'pig', color: '#cd99ff', isSelected: false },
  { name: 'rhino', color: '#fcc9a2', isSelected: false },
  { name: 'tiger', color: '#abf1ff', isSelected: false },
  { name: 'zebra', color: '#c9abff', isSelected: false },
]

// export const mockCharacterObj = (
//   partial?: Partial<CharacterObj>,
// ): CharacterObj => ({
//   name: randAnimal(),

//   color: randColor(),
//   isSelected: false,
//   ...partial,
// })

export const mockCharacterObj = (): CharacterObj =>
  characters[~~(Math.random() * characters.length)]

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
  nickname: randUserName(),
  selectedCharacter: mockCharacterObj(),
  isVIP: randBoolean(),
  id: randUuid(),
  peerId: randUuid(),
  usingMedia: randBoolean(),
  stream: undefined,
  points: randNumber({ min: 100, max: 1000 }),
  ...partial,
})
