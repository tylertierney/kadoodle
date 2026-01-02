import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameContext, mockGameContext } from '../../context/GameContext'
import PeerProvider from '../../context/PeerContext'
import Paper from '../Paper/Paper'
import Lobby from './Lobby'

const meta = {
  component: Lobby,
  title: 'Lobby',
  args: {},
  argTypes: {},
  decorators: [
    Story => {
      return (
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
              <Paper>
                <Story />
              </Paper>
            </div>
          </PeerProvider>
        </GameContext.Provider>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Lobby>
export default meta

type Story = StoryObj<typeof Lobby>

export const Default = {
  args: {},
} satisfies Story
