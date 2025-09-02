import type { Meta, StoryObj } from '@storybook/react-vite'
import Footer from './Footer'

const meta = {
  component: Footer,
  title: 'Footer',
} satisfies Meta<typeof Footer>
export default meta

type Story = StoryObj<typeof Footer>

export const Default = {
  args: {},
} satisfies Story
