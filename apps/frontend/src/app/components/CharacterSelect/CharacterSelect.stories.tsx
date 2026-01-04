import type { Meta, StoryObj } from '@storybook/react-vite'
import { defaultGameContext, GameContext } from '../../context/GameContext'
import PeerProvider from '../../context/PeerContext'
import CharacterSelect from './CharacterSelect'

const meta = {
  component: CharacterSelect,
  title: 'Character Select',
  args: {},
  argTypes: {},
  decorators: [
    Story => (
      <GameContext.Provider value={defaultGameContext}>
        <PeerProvider>
          <div
            style={{
              backgroundColor: 'var(--bg-color)',
              backgroundImage: `url('/svg/cloud.svg')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px',
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
} satisfies Meta<typeof CharacterSelect>
export default meta

type Story = StoryObj<typeof CharacterSelect>

export const Default = {
  args: {
    existingGame: false,
  },
} satisfies Story
