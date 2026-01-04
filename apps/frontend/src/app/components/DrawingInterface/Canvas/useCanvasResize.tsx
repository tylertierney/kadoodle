import { RefObject, useEffect, useState } from 'react'

export const useCanvasResize = (
  canvasContainerRef: RefObject<HTMLDivElement>,
) => {
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 })

  useEffect(() => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect()
      setCanvasSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      })
    }
  }, [canvasContainerRef])

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect()
        setCanvasSize({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        })
      }
    }
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return canvasSize
}

export default useCanvasResize
