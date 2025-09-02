import type { Meta, StoryObj } from '@storybook/react-vite'
import Input, { InputVariant } from './Input'

const meta = {
  component: Input,
  title: 'Input',
  args: {
    placeholder: 'Type something',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'] as InputVariant[],
    },
  },
} satisfies Meta<typeof Input>
export default meta

type Story = StoryObj<typeof Input>

export const Default = {
  args: {
    variant: 'primary',
  },
} satisfies Story
