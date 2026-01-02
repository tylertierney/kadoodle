import type { Meta, StoryObj } from '@storybook/react-vite'
import { BsArrowRightCircle } from 'react-icons/bs'
import { IoIosArrowBack, IoMdMenu } from 'react-icons/io'
import { expect, fn } from 'storybook/test'
import Button, { ButtonSize, ButtonVariant } from './Button'

const meta = {
  component: Button,
  title: 'Button',
  args: {
    onClick: fn(),
    isLoading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'primary',
        'secondary',
        'ghost',
        'gradient',
        'danger',
      ] as ButtonVariant[],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'] as ButtonSize[],
    },
    disabled: {
      type: 'boolean',
    },
    isLoading: {
      type: 'boolean',
    },
    rounded: {
      type: 'boolean',
    },
  },
  play: async ({ args, userEvent, canvas }) => {
    const btn = canvas.getByTestId('button') as HTMLButtonElement
    await expect(btn).toBeTruthy()

    await userEvent.click(btn)
    await expect(args.onClick).toHaveBeenCalled()
  },
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof Button>

export const Default = {
  args: {
    children: 'Create New Game',
    variant: 'primary',
    size: 'md',
  },
} satisfies Story

export const WithRightIcon = {
  args: {
    children: 'Create New Game',
    variant: 'primary',
    size: 'md',

    rightIcon: <BsArrowRightCircle />,
  },
} satisfies Story

export const WithLeftIcon = {
  args: {
    children: 'Back',
    variant: 'primary',
    size: 'md',

    leftIcon: <IoIosArrowBack />,
  },
} satisfies Story

export const RoundedWithIcon = {
  args: {
    rounded: true,
    children: <IoMdMenu />,
    variant: 'primary',
    size: 'md',
  },
} satisfies Story
