import type { Meta, StoryObj } from '@storybook/react-vite'
import LoaderDots from './LoaderDots'

const meta = {
  component: LoaderDots,
  title: 'Loader Dots',
  args: {},
  argTypes: {},
} satisfies Meta<typeof LoaderDots>
export default meta

type Story = StoryObj<typeof LoaderDots>

export const Default = {
  args: {},
} satisfies Story
