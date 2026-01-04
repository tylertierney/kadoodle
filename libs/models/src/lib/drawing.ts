import { randColor, randNumber } from '@ngneat/falso'

export interface Drawing {
  width: number
  height: number
  lines: Array<{
    brushColor: string
    brushRadius: number
    points: Array<{
      x: number
      y: number
    }>
  }>
}

export const mockDrawing = (partial?: Partial<Drawing>): Drawing => ({
  width: 600,
  height: 600,
  lines: Array(randNumber({ min: 3, max: 10 }))
    .fill(null)
    .map(() => ({
      brushColor: randColor(),
      brushRadius: randNumber({ min: 1, max: 10 }),
      points: Array(randNumber({ min: 3, max: 30 }))
        .fill(null)
        .map(() => ({
          x: randNumber({ min: 1, max: 600 }),
          y: randNumber({ min: 1, max: 600 }),
        })),
    })),
  ...partial,
})
