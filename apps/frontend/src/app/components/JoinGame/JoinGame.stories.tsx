import type { Meta, StoryObj } from '@storybook/react-vite'
import JoinGame from './JoinGame'

const meta = {
  component: JoinGame,
  title: 'Join Game',
} satisfies Meta<typeof JoinGame>
export default meta

type Story = StoryObj<typeof JoinGame>

export const Primary = {
  args: {},
} satisfies Story
