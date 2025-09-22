import { RefObject, useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styles from '../Canvas.module.scss'
import useCanvasResize from '../useCanvasResize'

interface Props {
  drawingData: string
}

export default function ReadOnlyCanvas({ drawingData }: Props) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<CanvasDraw>(null)
  const canvasSize = useCanvasResize(
    canvasContainerRef as RefObject<HTMLDivElement>,
  )

  // console.log(JSON.stringify(mockDrawing()))
  // console.log(drawingData)
  // console.log(drawingData)
  useEffect(() => {
    // console.log(drawingData)
    if (drawingData && drawingData.length > 1) {
      console.count()
      canvasRef.current?.loadSaveData(drawingData, true)
      // console.log(canvasRef.current)
      // canvasRef.current?.loadSaveData(JSON.stringify(mockDrawing()))
    }
  }, [drawingData])

  return (
    <div
      className={styles.canvas}
      // style={{ pointerEvents: 'none' }}
      ref={canvasContainerRef}>
      <CanvasDraw
        disabled={true}
        ref={canvasRef}
        hideInterface={true}
        hideGrid={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        backgroundColor="#f7f7f7"
      />
      {/* <GuessesProvider></GuessesProvider> */}
    </div>
  )
}
