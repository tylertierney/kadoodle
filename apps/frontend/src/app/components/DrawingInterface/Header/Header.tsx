import { useGame } from '../../../context/GameContext'
import Letters from '../Letters/Letters'
import Timer from '../Timer/Timer'
import TurnIndicator from '../TurnIndicator/TurnIndicator'
import styles from './Header.module.scss'

export default function Header() {
  const { turns, timer, players } = useGame()

  return (
    <div className={styles.header}>
      <Timer time={timer} />
      <Letters
        bounceAnimation={true}
        hidden={false}
        wordToDraw={turns.at(-1)?.word ?? ''}
      />
      <TurnIndicator turnIndex={turns.length} totalTurns={players.length} />
    </div>
  )
}
