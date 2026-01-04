import { BsArrowRightCircle } from 'react-icons/bs'
import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import Button from '../Button/Button'
import LoaderDots from '../LoaderDots/LoaderDots'
import styles from './Lobby.module.scss'

export default function Lobby() {
  const { players, setGameStage, currentPlayer, roomCode } = useGame()

  const handleStart = () => {
    socket.emit('startGame', roomCode)
    setGameStage('wordSelection')
  }

  const hostName = players.filter(player => player.isVIP)[0]?.nickname

  const message = currentPlayer?.isVIP
    ? 'Waiting for others to join...'
    : `Waiting for ${hostName || 'host'} to start the game...`

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <div className={styles.roomCodeBox}>
          <span className={styles.roomCodeLiteral}>Room Code:</span>
          <span className={styles.code}>{roomCode}</span>
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.h2}>
          <span className={styles.playerCount}>{players.length}</span>
          &nbsp;player
          {players.length === 0 || players.length > 1 ? 's' : ''}
          &nbsp;in the lobby
        </h2>
        <div className={styles.messageAndLoader}>
          <p className={styles.p}>{message}</p>
          <LoaderDots />
        </div>
        <br />
        {currentPlayer?.isVIP && (
          <div className={styles.startGameBtnAndLabel}>
            <div className={styles.buttonLabel}>Everyone in?</div>
            <Button
              style={{ width: '90%' }}
              size="lg"
              rightIcon={<BsArrowRightCircle size="1.4rem" />}
              onClick={() => handleStart()}
              variant="gradient"
              disabled={false}>
              Start Game!
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
