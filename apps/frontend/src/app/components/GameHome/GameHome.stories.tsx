import type { Meta, StoryObj } from '@storybook/react-vite'
import GameHome from './GameHome'

const meta = {
  component: GameHome,
  title: 'Game Home',
  args: {},
  argTypes: {},
} satisfies Meta<typeof GameHome>
export default meta

type Story = StoryObj<typeof GameHome>

export const Default = {
  args: {},
} satisfies Story
