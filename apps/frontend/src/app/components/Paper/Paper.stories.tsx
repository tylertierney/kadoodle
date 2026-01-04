import type { Meta, StoryObj } from '@storybook/react-vite'
import Paper from './Paper'

const meta = {
  component: Paper,
  title: 'Paper',
} satisfies Meta<typeof Paper>
export default meta

type Story = StoryObj<typeof Paper>

export const Primary = {
  args: {},
} satisfies Story
