import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameContext, mockGameContext } from '../../context/GameContext'
import PeerProvider from '../../context/PeerContext'
import GameHome from '../GameHome/GameHome'
import WordSelection from './WordSelection'

const meta = {
  component: WordSelection,
  title: 'Word Selection',
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
            <GameHome>
              <Story />
            </GameHome>
          </div>
        </PeerProvider>
      </GameContext.Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WordSelection>
export default meta

type Story = StoryObj<typeof WordSelection>

export const Default = {
  args: { isArtist: true },
} satisfies Story
