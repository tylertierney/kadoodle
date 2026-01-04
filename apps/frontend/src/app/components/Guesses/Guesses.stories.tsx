import { Guess } from '@kadoodle/models'
import { randUserName, randUuid, randWord } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { GameContext, mockGameContext } from '../../context/GameContext'
import Guesses from './Guesses'

const Wrapper = () => {
  const [guesses, setGuesses] = useState<Guess[]>([])

  useEffect(() => {
    const addGuessInterval = setInterval(() => {
      setGuesses(prev => [
        ...prev,
        {
          id: randUuid(),
          text: randWord(),
          isCorrect: false,
          nickname: randUserName(),
        },
      ])
    }, 750)

    const removeGuessInterval = setInterval(
      () => setGuesses(prev => prev.slice(1)),
      3000,
    )

    return () => {
      clearInterval(addGuessInterval)
      clearInterval(removeGuessInterval)
    }
  }, [])

  return (
    <GameContext.Provider value={mockGameContext()}>
      <Guesses guesses={guesses} setGuesses={setGuesses} />
    </GameContext.Provider>
  )
}

const meta = {
  component: Wrapper,
  title: 'Guesses',
  decorators: [
    Story => (
      <GameContext.Provider value={mockGameContext()}>
        <Story />
      </GameContext.Provider>
    ),
  ],
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof Wrapper>

export const Default = {
  args: {
    // guesses: [],
    // setGuesses: fn(),
  },
} satisfies Story
