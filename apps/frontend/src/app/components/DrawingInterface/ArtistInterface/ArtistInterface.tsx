import { useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import GuessesProvider from '../../../context/GuessesContext'
import Canvas from '../Canvas/Canvas'
import Header from '../Header/Header'
import { ColorType } from '../Toolbar/ColorInput/ColorInput'
import Toolbar from '../Toolbar/Toolbar'

export default function ArtistInterface() {
  const [brushRadius, setBrushRadius] = useState(8)
  const [brushColor, setBrushColor] = useState<ColorType>('blue')

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

  return (
    <>
      <Header lettersHidden={false}></Header>
      <Canvas
        brushColor={brushColor}
        brushRadius={brushRadius}
        canvasRef={canvasRef}>
        <GuessesProvider></GuessesProvider>
      </Canvas>
      <Toolbar
        brushRadius={brushRadius}
        setBrushRadius={setBrushRadius}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        clearCanvas={clearCanvas}
        undo={undo}
        isArtist={true}
        guess=""
      />
    </>
  )
}
