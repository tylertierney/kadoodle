import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import ColorInput, { ColorType } from './ColorInput'

const Wrapper = () => {
  const [brushColor, setBrushColor] = useState<ColorType>('white')

  return <ColorInput brushColor={brushColor} setBrushColor={setBrushColor} />
}

const meta = {
  component: Wrapper,
  title: 'Drawing Interface/Toolbar/Color Input',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Wrapper>
export default meta

type Story = StoryObj<typeof Wrapper>

export const Default = {
  args: {},
} satisfies Story
