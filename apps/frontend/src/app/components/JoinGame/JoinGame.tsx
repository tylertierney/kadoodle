import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import Button from '../Button/Button'
import Input from '../Input/Input'
import PaperPage from '../PaperPage/PaperPage'
import styles from './JoinGame.module.scss'

export default function JoinGame() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setGameStage, roomCodeInput, setRoomCodeInput } = useGame()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRoomCodeInput(value.toUpperCase())
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    socket.emit('checkIfRoomExists', roomCodeInput)
  }

  useEffect(() => {
    const callback = (roomExists: boolean) => {
      setIsLoading(false)
      if (roomExists) {
        setError('')
        setGameStage('characterSelect_joining_game')
        return
      }
      setError("That game doesn't exist, try a different code.")
    }

    socket.on('checkIfRoomExists', callback)

    return () => {
      socket.off('checkIfRoomExists', callback)
    }
  }, [setGameStage])

  return (
    <PaperPage>
      <div className={styles.header}>
        <Button
          onClick={() => setGameStage('initial')}
          variant="ghost"
          size="md"
          leftIcon={<IoIosArrowBack />}>
          Back
        </Button>
      </div>
      <form className={styles.body} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Enter a room code</h1>
        <Input
          ref={inputRef}
          maxLength={4}
          type="text"
          style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '2rem',
          }}
          placeholder="ABCD"
          onChange={handleChange}
          value={roomCodeInput}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button
          disabled={roomCodeInput.length < 4}
          isLoading={isLoading}
          variant="primary"
          size="lg"
          rightIcon={<BsArrowRightCircle />}
          style={{ alignSelf: 'stretch' }}
          type="submit">
          Join Game
        </Button>
      </form>
    </PaperPage>
  )
}
