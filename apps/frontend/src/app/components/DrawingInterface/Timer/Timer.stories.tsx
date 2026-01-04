import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import Timer from './Timer'

const Wrapper = () => {
  const [time, setTime] = useState(90)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <Timer time={time} />
}

const meta = {
  component: Wrapper,
  title: 'Drawing Interface/Timer',
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
