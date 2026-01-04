import styles from './Letters.module.scss'

interface Props {
  wordToDraw: string
  hidden: boolean
  bounceAnimation: boolean
}

export default function Letters({
  wordToDraw = '',
  hidden = false,
  bounceAnimation = true,
}: Props) {
  return (
    <div className={styles.letters}>
      {wordToDraw.split('').map((letter: string, idx: number) => {
        return (
          <div
            key={idx}
            className={`
              ${styles.letter}
              ${letter === ' ' ? '' : styles.underline}
              ${bounceAnimation && styles.bounce}`}>
            {hidden ? '' : letter}
          </div>
        )
      })}
    </div>
  )
}
