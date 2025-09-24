import { RefObject, useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useGame } from '../../../context/GameContext'
import socket from '../../../socket'
import { getLocalStorage } from '../../../utils/utils'
import styles from './Canvas.module.scss'
import useCanvasResize from './useCanvasResize'

interface Props {
  brushRadius: number
  brushColor: string
  canvasRef: RefObject<CanvasDraw | null>
}

export default function Canvas({ brushRadius, brushColor, canvasRef }: Props) {
  const { turns, currentPlayer, roomCode } = useGame()
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasSize = useCanvasResize(
    canvasContainerRef as RefObject<HTMLDivElement>,
  )

  useEffect(() => {
    const existingGame = getLocalStorage()
    if (existingGame && existingGame.turns.length > 0) {
      const drawingData = existingGame.turns[turns.length - 1].drawing
      if (canvasRef && canvasRef?.current && drawingData) {
        canvasRef.current.loadSaveData(drawingData)
      }
    }
  }, [canvasRef?.current, currentPlayer])

  const hideBrush = window.innerWidth < 430 ? true : false

  return (
    <div className={styles.canvas} ref={canvasContainerRef}>
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        catenaryColor={brushColor}
        lazyRadius={0}
        onChange={e => {
          socket.emit('draw', e.getSaveData(), roomCode)
        }}
        immediateLoading={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        hideGrid={true}
        hideInterface={hideBrush}
        backgroundColor="#f7f7f7"
      />
      {/* <GuessesProvider></GuessesProvider> */}
    </div>
  )
}
