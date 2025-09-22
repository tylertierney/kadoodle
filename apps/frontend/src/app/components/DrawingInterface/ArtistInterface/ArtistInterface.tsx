import { useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'

interface Props {
  wordToDraw: string[]
}

export default function ArtistInterface() {
  const [brushRadius, setBrushRadius] = useState(8)
  const [brushColor, setBrushColor] = useState('blue')

  const canvasRef = useRef<CanvasDraw>(null)

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }

  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo()
    }
  }

  return <span>hi</span>
}
