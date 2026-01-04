import { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/internal/test'
import { defaultGameContext, GameContext } from '../../context/GameContext'
import PeerProvider from '../../context/PeerContext'
import Navbar from './Navbar'

const meta = {
  component: Navbar,
  title: 'Navbar',
  decorators: [
    Story => (
      <GameContext.Provider value={defaultGameContext}>
        <PeerProvider>
          <div style={{ border: 'solid red 1px' }}>
            <Story />
          </div>
        </PeerProvider>
      </GameContext.Provider>
    ),
  ],
  args: {
    menuOpen: false,
    setMenuOpen: fn(),
  },
} satisfies Meta<typeof Navbar>
export default meta

type Story = StoryObj<typeof Navbar>

export const Default = {
  args: {},
} satisfies Story

export const UsingMedia = {
  args: {},
  decorators: [
    Story => (
      <GameContext.Provider value={{ ...defaultGameContext, usingMedia: true }}>
        <PeerProvider>
          <Story />
        </PeerProvider>
      </GameContext.Provider>
    ),
  ],
} satisfies Story
