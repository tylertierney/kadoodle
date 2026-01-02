import { mockRoom } from '@kadoodle/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  GameContext,
  GameContextType,
  defaultGameContext,
} from '../../../context/GameContext'
import PeerProvider from '../../../context/PeerContext'
import Paper from '../../Paper/Paper'
import ArtistInterface from './ArtistInterface'

const generateFakeGameContext = (): GameContextType => {
  const room = mockRoom()
  return { ...defaultGameContext, players: room.players, turns: room.turns }
}

const meta = {
  component: ArtistInterface,
  title: 'Drawing Interface/Artist Interface',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <GameContext.Provider value={generateFakeGameContext()}>
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
    ),
  ],
} satisfies Meta<typeof ArtistInterface>
export default meta

type Story = StoryObj<typeof ArtistInterface>

export const Default = {
  args: {},
} satisfies Story
