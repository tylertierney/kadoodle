import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameContext, mockGameContext } from '../../context/GameContext'
import PeerProvider from '../../context/PeerContext'
import GameHome from './GameHome'

const meta = {
  component: GameHome,
  title: 'Game Home',
  args: {},
  argTypes: {},
  decorators: [
    Story => (
      <GameContext.Provider value={mockGameContext()}>
        <PeerProvider>
          <div
            style={{
              backgroundColor: 'var(--bg-color)',
              backgroundImage: `url('/svg/cloud.svg')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px',
              minHeight: '100vh',
            }}>
            <Story />
          </div>
        </PeerProvider>
      </GameContext.Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GameHome>
export default meta

type Story = StoryObj<typeof GameHome>

export const Default = {
  args: {},
} satisfies Story
