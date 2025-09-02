import type { Meta, StoryObj } from '@storybook/react-vite'
import Welcome from './Welcome'

const meta = {
  component: Welcome,
  title: 'Welcome',
  args: {},
  argTypes: {},
} satisfies Meta<typeof Welcome>
export default meta

type Story = StoryObj<typeof Welcome>

export const Default = {
  args: {},
} satisfies Story
