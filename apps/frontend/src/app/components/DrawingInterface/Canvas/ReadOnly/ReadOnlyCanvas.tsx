import { PropsWithChildren, RefObject, useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styles from '../Canvas.module.scss'
import useCanvasResize from '../useCanvasResize'

interface Props {
  drawingData: string
}

export default function ReadOnlyCanvas({
  drawingData,
  children,
}: PropsWithChildren<Props>) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<CanvasDraw>(null)
  const canvasSize = useCanvasResize(
    canvasContainerRef as RefObject<HTMLDivElement>,
  )

  useEffect(() => {
    if (!canvasRef.current) return

    if (canvasRef.current && drawingData && drawingData.length > 1) {
      setTimeout(() => {
        canvasRef.current?.loadSaveData(drawingData)
      }, 1)
    }
  }, [drawingData, canvasRef])

  return (
    <div
      className={styles.canvas}
      style={{ pointerEvents: 'none' }}
      ref={canvasContainerRef}>
      <CanvasDraw
        ref={canvasRef}
        hideInterface={true}
        hideGrid={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        backgroundColor="#f7f7f7"
        immediateLoading={false}
      />
      {children}
    </div>
  )
}
