import { mockPlayer } from '@kadoodle/models'
import { randNumber } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import PlayerAvatar from './PlayerAvatar'

const player = mockPlayer({ points: randNumber({ min: 1, max: 10 }) })

const Wrapper = ({ isVIP }: { isVIP: boolean }) => {
  const [points, setPoints] = useState(player.points)
  useEffect(() => {
    const interval = setInterval(
      () => setPoints(prev => prev + randNumber({ min: 10, max: 30 })),
      3000,
    )

    return () => clearInterval(interval)
  }, [])
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-color)',
        backgroundImage: `url('/svg/cloud.svg')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px',
        height: '100vh',
        padding: '2rem',
      }}>
      <PlayerAvatar player={{ ...player, points, isVIP }} streams={{}} />
    </div>
  )
}

const meta = {
  component: Wrapper,
  title: 'Player Avatar',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Wrapper>
export default meta

type Story = StoryObj<typeof Wrapper>

export const Default = {
  args: {
    isVIP: false,
  },
} satisfies Story
