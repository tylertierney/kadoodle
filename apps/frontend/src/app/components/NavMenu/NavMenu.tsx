import { Player } from '@kadoodle/models'
import { Dispatch, SetStateAction, useRef } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { IoIosExit, IoMdClose } from 'react-icons/io'
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
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const showModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
    setMenuOpen(false)
    document.body.style.overflow = 'hidden'
  }

  const hideModal = () => {
    if (!modalRef.current) return

    modalRef.current.close()
    document.body.style.overflow = 'unset'
  }

  const getExitButton = (currentPlayer: Player | null) => {
    if (!currentPlayer) return null

    if (currentPlayer.isVIP) {
      return (
        <Button
          leftIcon={<IoIosExit />}
          className={styles.listItemBtn}
          onClick={() => {
            socket.emit('endGame', roomCode)
            endGame()
            setMenuOpen(false)
          }}
          variant="danger"
          size="lg">
          End Game
        </Button>
      )
    }

    return (
      <Button
        leftIcon={<IoIosExit />}
        className={styles.listItemBtn}
        onClick={() => {
          socket.emit('leaveGame', roomCode, currentPlayer)
          setMenuOpen(false)
        }}
        variant="danger"
        size="lg">
        Leave Game
      </Button>
    )
  }

  return (
    <>
      <div
        className={`${styles.menuContainer} ${
          menuOpen ? styles.open : styles.closed
        }`}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Button
              leftIcon={<FaQuestionCircle />}
              size="lg"
              variant="secondary"
              className={styles.listItemBtn}
              onClick={showModal}>
              How To Play
            </Button>
          </li>
          <li className={styles.li}>{getExitButton(currentPlayer)}</li>
        </ul>
      </div>
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${styles.overlay} ${
          menuOpen ? styles.overlayOpen : styles.overlayClosed
        }`}></div>
      <dialog ref={modalRef} onClick={hideModal} className={styles.backdrop}>
        <div onClick={e => e.stopPropagation()} className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1 className={styles.h1}>How To Play</h1>
            <Button rounded={true} variant="ghost" onClick={hideModal}>
              <IoMdClose />
            </Button>
          </div>
          <article className={styles.modalBody}>
            <ol className={styles.ol}>
              <li className={styles.li}>
                One player creates a lobby. This player is the <b>VIP</b> (the
                host). The lobby has a unique 4-character room code.
              </li>
              <li className={styles.li}>
                Other players can join the lobby using the room code.
              </li>
              <li className={styles.li}>
                Each player selects an avatar or chooses to use their camera and
                microphone.
              </li>
              <li className={styles.li}>
                <p className={styles.p}>
                  After the game starts, each player takes a turn as an artist.
                  All other players must guess what the artist is drawing. More
                  points are awarded to those who can answer correctly the
                  fastest.
                </p>
                <p className={styles.p}>
                  Each guess is visible to <i>all players in the lobby</i>.
                </p>
                <p className={styles.p}>
                  Letters within each guess are highlighted based on the
                  letter's position in the answer.
                  <ul className={styles.ul} style={{ marginTop: '0.5rem' }}>
                    <li
                      className={styles.li}
                      style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: 'green' }}>Green</span> indicates
                      that the letter is correct <i>and</i> in the right
                      position.
                    </li>
                    <li className={styles.li}>
                      <span style={{ color: 'var(--light-orange)' }}>
                        Orange
                      </span>{' '}
                      indicates that the letter exists in the answer, but is in
                      the wrong position.
                    </li>
                  </ul>
                </p>
              </li>
            </ol>
          </article>
        </div>
      </dialog>
    </>
  )
}
