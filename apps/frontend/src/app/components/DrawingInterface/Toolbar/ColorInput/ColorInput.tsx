import { CSSProperties, Dispatch, SetStateAction } from 'react'
import styles from './ColorInput.module.scss'

export type ColorType =
  | NonNullable<CSSProperties['color']>
  | NonNullable<CSSProperties['backgroundColor']>

interface Props {
  brushColor: ColorType
  setBrushColor: Dispatch<SetStateAction<ColorType>>
}

export default function ColorInput({ brushColor, setBrushColor }: Props) {
  return (
    <div className={styles.colorInputContainer}>
      <input
        value={brushColor}
        onChange={e => setBrushColor(e.target.value)}
        className={styles.input}
        type="color"
      />
      <div className={styles.rainbowWheel}></div>
      <div
        className={styles.colorIndicator}
        style={{ backgroundColor: brushColor }}></div>
    </div>
  )
}
