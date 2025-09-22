import { mockDrawing } from '@kadoodle/models'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ReadOnlyCanvas from './ReadOnlyCanvas'

const meta = {
  component: ReadOnlyCanvas,
  title: 'Drawing Interface/Canvas/Read-Only Canvas',
  args: {
    drawingData: JSON.stringify(mockDrawing()),
  },
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
  // decorators: [
  //   (Story: typeof ReadOnlyCanvas, ctx) => {
  //     const idk = mockDrawing()
  //     console.log(idk)
  //     const [drawing, setDrawing] = useState(idk)

  //     return (
  //       <>
  //         <Button onClick={() => setDrawing(mockDrawing())} variant="secondary">
  //           Generate a new drawing
  //         </Button>
  //         <Paper>
  //           <Story {...ctx.args} drawingData={JSON.stringify(drawing)} />
  //         </Paper>
  //       </>
  //     )
  //   },
  // ],
  // decorators: [
  //   Story => (
  //     <Paper>
  //       <Story />
  //     </Paper>
  //   ),
  // ],
} satisfies Meta<typeof ReadOnlyCanvas>
export default meta

type Story = StoryObj<typeof ReadOnlyCanvas>

export const Default = {
  // args: {
  //   // drawingData: `{"width":600,"height":600,"lines":[{"brushColor":"MediumSeaGreen","brushRadius":6,"points":[{"x":530,"y":432},{"x":542,"y":306},{"x":44,"y":199},{"x":435,"y":480},{"x":536,"y":582},{"x":334,"y":424},{"x":448,"y":344},{"x":415,"y":438},{"x":498,"y":138},{"x":406,"y":600},{"x":277,"y":121},{"x":552,"y":454},{"x":289,"y":195},{"x":275,"y":277},{"x":242,"y":304}]}]}`,
  //   drawingData: JSON.stringify(mockDrawing()),
  // },
} satisfies Story
