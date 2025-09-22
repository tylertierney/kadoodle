import styles from './TurnIndicator.module.scss'

interface Props {
  turnIndex: number
  totalTurns: number
}

export default function TurnIndicator({ turnIndex, totalTurns }: Props) {
  return (
    <div className={styles.turnIndicator}>
      <span className={styles.turnText}>round</span>
      <span className={styles.turnNumber}>
        {turnIndex}&nbsp;/&nbsp;{totalTurns}
      </span>
    </div>
  )
}
