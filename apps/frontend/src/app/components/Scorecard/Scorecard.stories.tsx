import { mockTurn } from '@kadoodle/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Scorecard from './Scorecard'

const meta = {
  component: Scorecard,
  title: 'Scorecard',
} satisfies Meta<typeof Scorecard>
export default meta

type Story = StoryObj<typeof Scorecard>

export const Primary = {
  args: {
    turn: mockTurn(),
  },
} satisfies Story
