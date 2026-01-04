import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import Paper from '../../Paper/Paper'
import Canvas from './Canvas'

const meta = {
  component: Canvas,
  title: 'Drawing Interface/Canvas',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story: typeof Canvas, ctx) => {
      const canvasRef = useRef<CanvasDraw>(null)

      return (
        <Paper>
          <Story {...ctx.args} canvasRef={canvasRef} />
        </Paper>
      )
    },
  ],
} satisfies Meta<typeof Canvas>
export default meta

type Story = StoryObj<typeof Canvas>

export const Default = {
  args: {
    brushColor: 'blue',
    brushRadius: 8,
  },
} satisfies Story
