import type { Meta, StoryObj } from '@storybook/react-vite'
import Sidebar from './Sidebar'

const meta = {
  component: Sidebar,
  title: 'Game Home/Sidebar',
  args: {},
  argTypes: {},
} satisfies Meta<typeof Sidebar>
export default meta

type Story = StoryObj<typeof Sidebar>

export const Default = {
  args: {},
} satisfies Story
