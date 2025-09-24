import { mockDrawing } from '@kadoodle/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ReadOnlyCanvas from './ReadOnlyCanvas'

const meta = {
  component: ReadOnlyCanvas,
  title: 'Drawing Interface/Canvas/Read-Only Canvas',
  args: {
    drawingData: JSON.stringify(mockDrawing()),
  },
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ReadOnlyCanvas>
export default meta

type Story = StoryObj<typeof ReadOnlyCanvas>

export const Default = {
  args: {
    drawingData: JSON.stringify(mockDrawing()),
  },
} satisfies Story
