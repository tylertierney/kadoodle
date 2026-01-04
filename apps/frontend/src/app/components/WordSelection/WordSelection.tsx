import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import Button from '../Button/Button'
import styles from './WordSelection.module.scss'

interface Props {
  isArtist: boolean
}

export default function WordSelection({ isArtist }: Props) {
  const { turns, roomCode } = useGame()

  const possibleWords = turns[turns.length - 1]?.possibleWords ?? []

  const handleSelectWord = (word: string) => {
    socket.emit('selectWord', word, roomCode)
  }

  const artist = turns[turns.length - 1]?.artist.nickname

  const contentForArtist = (
    <>
      <h2 className={styles.h2}>Choose a word to draw</h2>
      <div className={styles.buttons}>
        {possibleWords.map((word, idx) => (
          <Button
            key={idx}
            variant="primary"
            size="lg"
            onClick={() => handleSelectWord(word)}>
            {word}
          </Button>
        ))}
      </div>
    </>
  )

  const contentForOthers = (
    <h2 className={styles.h2}>
      Waiting on <span className={styles.artistName}>{artist}</span> to pick a
      word
    </h2>
  )

  return (
    <div className={styles.wordSelection}>
      {isArtist ? contentForArtist : contentForOthers}
    </div>
  )
}
