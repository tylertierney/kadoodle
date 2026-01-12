import { CSSProperties } from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useGame } from '../../context/GameContext'
import Button from '../Button/Button'
import KadoodleTextSVG from '../KadoodleTextSVG/KadoodleTextSVG'
import PaperPage from '../PaperPage/PaperPage'
import styles from './Welcome.module.scss'

interface Props {
  style?: CSSProperties
}

export default function Welcome({ style = {} }: Props) {
  const { setGameStage, error } = useGame()

  return (
    <PaperPage>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Welcome to</h1>
          <div className={styles.logoAndExclamation}>
            <KadoodleTextSVG />
            <span className={styles.exclamation}>!</span>
          </div>
        </div>
        <p className={styles.p}>
          Kadoodle is a multiplayer drawing + guessing game. Create a lobby and
          invite friends to your game, or join an existing one.
        </p>
        <div className={styles.buttons}>
          <Button
            disabled={Boolean(error)}
            variant="secondary"
            size="lg"
            rightIcon={<BsArrowRightCircle />}
            onClick={() => setGameStage('entering_roomCode')}>
            Join Game
          </Button>
          <Button
            disabled={Boolean(error)}
            variant="gradient"
            size="lg"
            rightIcon={<BiPlusCircle fontSize="1.7rem" />}
            onClick={() => setGameStage('characterSelect_creating_game')}>
            Create New Game
          </Button>
        </div>
      </div>
    </PaperPage>
  )
}
