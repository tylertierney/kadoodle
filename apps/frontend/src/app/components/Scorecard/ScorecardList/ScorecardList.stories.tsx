import { randNumber, randUserName } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ScorecardList from './ScorecardList'

const meta = {
  component: ScorecardList,
  title: 'Scorecard/ScorecardList',
} satisfies Meta<typeof ScorecardList>
export default meta

type Story = StoryObj<typeof ScorecardList>

export const Default = {
  args: {
    players: Array(10)
      .fill(null)
      .map(() => ({
        nickname: randUserName(),
        points: randNumber({ min: 10, max: 1_000 }),
      })),
  },
} satisfies Story
