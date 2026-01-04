import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Toolbar from './Toolbar'

// const generateFakeGameContext = (): GameContextType => {
//   const room = mockRoom()
//   return { ...defaultGameContext, players: room.players, turns: room.turns }
// }

// const Wrapper = () => {
//   const [brushRadius, setBrushRadius] = useState(8)
//       const [brushColor, setBrushColor] = useState('blue')
//       const [guess, setGuess] = useState('')
// }

const meta = {
  component: Toolbar,
  title: 'Drawing Interface/Toolbar',
  render: args => {
    const Wrapper = () => {
      const [brushRadius, setBrushRadius] = useState(8)
      const [brushColor, setBrushColor] = useState('blue')
      const [guess, setGuess] = useState('')

      return (
        <Toolbar
          {...args}
          guess={guess}
          setGuess={setGuess}
          brushRadius={brushRadius}
          setBrushRadius={setBrushRadius}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
        />
      )
    }

    return <Wrapper />
  },
  // decorators: [
  //   (_, ctx) => {
  //     const [brushRadius, setBrushRadius] = useState(8)
  //     const [brushColor, setBrushColor] = useState('blue')
  //     const [guess, setGuess] = useState('')

  //     return (
  //       <Toolbar
  //         {...ctx.args}
  //         guess={guess}
  //         setGuess={setGuess}
  //         brushRadius={brushRadius}
  //         setBrushRadius={setBrushRadius}
  //         brushColor={brushColor}
  //         setBrushColor={setBrushColor}
  //       />
  //     )
  //   },
  // ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Toolbar>
export default meta

type Story = StoryObj<typeof Toolbar>

export const Default = {
  args: {
    // brushRadius: 8,
    // brushColor: 'blue',
    isArtist: true,
  },
} satisfies Story
