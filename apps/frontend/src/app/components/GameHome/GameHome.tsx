import { PropsWithChildren } from 'react'
import { useGame } from '../../context/GameContext'
import { usePeer } from '../../context/PeerContext'
import Paper from '../Paper/Paper'
import styles from './GameHome.module.scss'
import Sidebar from './Sidebar/Sidebar'

export default function GameHome({ children }: PropsWithChildren) {
  const { players, turns, currentPlayer, gameStage } = useGame()
  const { streams } = usePeer()

  const half = ~~(players.length / 2)
  const leftSidePlayers = players.slice(0, half)
  const rightSidePlayers = players.slice(half)

  return (
    <div className={styles.gameHome}>
      <Sidebar
        className={`${styles.sidebar} ${styles.left}`}
        players={leftSidePlayers}
        streams={streams}
        side="left"
      />
      <Paper className={styles.paper} style={{ flexGrow: 1 }}>
        {children}
      </Paper>
      <Sidebar
        className={`${styles.sidebar} ${styles.right}`}
        players={rightSidePlayers}
        streams={streams}
        side="right"
      />
    </div>
  )
}
