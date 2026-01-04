import { randNumber } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import TurnIndicator from './TurnIndicator'

const meta = {
  component: TurnIndicator,
  title: 'Drawing Interface/Turn Indicator',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TurnIndicator>
export default meta

type Story = StoryObj<typeof TurnIndicator>

const totalTurns = randNumber({ min: 1, max: 20 })
const turnIndex = randNumber({ min: 1, max: totalTurns })

export const Default = {
  args: {
    turnIndex,
    totalTurns,
  },
} satisfies Story
