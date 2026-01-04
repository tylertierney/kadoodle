import { Dispatch, FormEvent, SetStateAction } from 'react'
import { FaEraser, FaTrashAlt, FaUndo } from 'react-icons/fa'
import ColorInput from './ColorInput/ColorInput'
import styles from './Toolbar.module.scss'

export interface Props {
  brushRadius: number
  setBrushRadius: Dispatch<SetStateAction<number>>
  brushColor: string
  setBrushColor: Dispatch<SetStateAction<string>>
  clearCanvas: () => void
  undo: () => void
  isArtist: boolean
  guess: string
  setGuess?: Dispatch<SetStateAction<string>>
  handleGuessSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export default function Toolbar({
  brushRadius = 8,
  setBrushRadius,
  brushColor = 'blue',
  setBrushColor,
  clearCanvas,
  undo,
  isArtist,
  guess,
  setGuess,
  handleGuessSubmit,
}: Props) {
  const brushes = [4, 6, 8, 10, 12].map((radius: number, idx: number) => {
    const isSelected = radius === brushRadius
    return (
      <div
        key={idx}
        className={styles.brush}
        style={{
          width: `${Math.floor(radius * 2.5)}px`,
          height: `${Math.floor(radius * 2.5)}px`,
          border: isSelected ? `3px solid ${brushColor}` : 'none',
        }}
        onClick={() => setBrushRadius(radius)}></div>
    )
  })

  const colors = [
    '#ff604c',
    '#0000ff',
    '#26eca8',
    '#ffd700',
    '#00c4ff',
    '#ffa500',
    '#6158df',
    '#a52a2a',
    '#000000',
  ].map((color: string, idx: number) => {
    const isSelected = color === brushColor
    return (
      <div
        key={idx}
        style={{
          backgroundColor: color,
        }}
        className={`${styles.colorBlotch} ${isSelected && styles.selected}`}
        onClick={() => setBrushColor(color)}></div>
    )
  })

  const artistTools = (
    <>
      <div className={styles.brushesContainer}>{brushes}</div>
      <div className={styles.controlsContainer}>
        <button onClick={() => undo()} className={styles.controlBtn}>
          <FaUndo fontSize="1.5rem" />
        </button>
        <button
          onClick={() => setBrushColor('#f7f7f7')}
          className={styles.controlBtn}>
          <FaEraser fontSize="1.7rem" />
        </button>
        <button onClick={() => clearCanvas()} className={styles.controlBtn}>
          <FaTrashAlt fontSize="1.5rem" />
        </button>
      </div>
      <div className={styles.paletteContainer}>
        {colors}
        {/* <input
          type="color"
          value={brushColor}
          onChange={e => setBrushColor(e.target.value)}
          className={styles.colorInput}
        /> */}
        <ColorInput brushColor={brushColor} setBrushColor={setBrushColor} />
      </div>
    </>
  )

  const guesserTools = (
    <div className={styles.guessInputContainer}>
      <form onSubmit={e => handleGuessSubmit?.(e)}>
        <input
          onChange={e => (setGuess ? setGuess(e.target.value) : {})}
          value={guess}
          type="text"
          className={styles.guessInput}
          enterKeyHint="go"
        />
      </form>
    </div>
  )

  return (
    <div className={styles.toolbarContainer}>
      {isArtist ? artistTools : guesserTools}
    </div>
  )
}
