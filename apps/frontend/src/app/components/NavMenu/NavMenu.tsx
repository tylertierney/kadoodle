import { Player } from '@kadoodle/models'
import { Dispatch, SetStateAction } from 'react'
import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import Button from '../Button/Button'
import styles from './NavMenu.module.scss'

interface Props {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function NavMenu({ menuOpen, setMenuOpen }: Props) {
  const { roomCode, endGame, currentPlayer } = useGame()

  const handleEndGame = () => {
    socket.emit('endGame', roomCode)
    endGame()
    setMenuOpen(false)
  }

  const getButtons = (currentPlayer: Player | null) => {
    if (!currentPlayer) return null

    if (currentPlayer.isVIP) {
      return (
        <Button onClick={() => handleEndGame()} variant="danger">
          End Game
        </Button>
      )
    }

    return <Button variant="danger">Leave Game</Button>
  }

  return (
    <>
      <div
        className={`${styles.menuContainer} ${
          menuOpen ? styles.open : styles.closed
        }`}>
        <div className={styles.menuListContainer}>
          {getButtons(currentPlayer)}
        </div>
      </div>
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${styles.overlay} ${
          menuOpen ? styles.overlayOpen : styles.overlayClosed
        }`}></div>
    </>
  )
}
