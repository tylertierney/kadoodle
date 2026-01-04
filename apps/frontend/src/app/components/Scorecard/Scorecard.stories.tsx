import { mockPlayer, mockTurn, Turn } from '@kadoodle/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameContext, mockGameContext } from '../../context/GameContext'
import PaperPage from '../PaperPage/PaperPage'
import Scorecard from './Scorecard'

const Wrapper = ({ turn, isVIP = true }: { turn: Turn; isVIP: boolean }) => {
  const ctx = mockGameContext()
  return (
    <GameContext.Provider
      value={{ ...ctx, currentPlayer: mockPlayer({ isVIP }) }}>
      <PaperPage>
        <Scorecard turn={turn} />
      </PaperPage>
    </GameContext.Provider>
  )
}

const meta = {
  component: Wrapper,
  title: 'Scorecard',
  argTypes: {
    isVIP: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof Wrapper>
export default meta

type Story = StoryObj<typeof Wrapper>

export const RoundOver = {
  args: {
    turn: mockTurn({ lastTurn: false }),
    isVIP: true,
  },
} satisfies Story

export const GameOver = {
  args: {
    turn: mockTurn({ lastTurn: true }),
    isVIP: true,
  },
} satisfies Story
