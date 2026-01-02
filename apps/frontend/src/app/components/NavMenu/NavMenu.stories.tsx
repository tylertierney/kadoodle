import type { Meta, StoryObj } from '@storybook/react-vite'
import NavMenu from './NavMenu'

const meta = {
  component: NavMenu,
  title: 'NavMenu',
} satisfies Meta<typeof NavMenu>
export default meta

type Story = StoryObj<typeof NavMenu>

export const Default = {
  args: {
    menuOpen: true,
  },
} satisfies Story
