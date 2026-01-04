import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import App from './app'

const meta = {
  component: App,
  title: 'App',
} satisfies Meta<typeof App>
export default meta

type Story = StoryObj<typeof App>

// export const Primary = {
//   args: {},
// } satisfies Story

// export const Heading = {
//   args: {},
//   play: async ({ canvas }) => {
//     await expect(canvas.getByText(/App/gi)).toBeTruthy()
//   },
// } satisfies Story
