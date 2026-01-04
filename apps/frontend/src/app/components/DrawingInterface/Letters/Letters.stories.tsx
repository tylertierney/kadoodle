import { randAnimal } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Letters from './Letters'

const meta = {
  component: Letters,
  title: 'Drawing Interface/Letters',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Letters>
export default meta

type Story = StoryObj<typeof Letters>

export const Default = {
  args: {
    bounceAnimation: true,
    hidden: false,
    wordToDraw: randAnimal(),
  },
} satisfies Story
