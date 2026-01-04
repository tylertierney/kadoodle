import { FormEvent, useState } from 'react'
import { useGame } from '../../../context/GameContext'
import GuessesProvider from '../../../context/GuessesContext'
import socket from '../../../socket'
import ReadOnlyCanvas from '../Canvas/ReadOnly/ReadOnlyCanvas'
import Letters from '../Letters/Letters'
import Toolbar from '../Toolbar/Toolbar'

interface Props {
  drawingData: string
}

export default function GuesserInterface({ drawingData }: Props) {
  const { currentPlayer, roomCode, turns } = useGame()
  const [guess, setGuess] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const wordToDraw = turns.at(-1)?.word ?? ''

  const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const guessObj = {
      nickname: currentPlayer?.nickname ?? '',
      id: currentPlayer?.id ?? '',
      text: guess.toLowerCase().trim(),
      isCorrect: false,
    }
    if (guessObj.text === wordToDraw.toLowerCase().trim()) {
      guessObj.isCorrect = true
      setIsCorrect(true)
    }
    socket.emit('guess', guessObj, roomCode)
    setGuess('')
  }

  return (
    <div data-testid="GuesserInterface">
      <Letters
        wordToDraw={wordToDraw}
        hidden={!isCorrect}
        bounceAnimation={isCorrect}
      />
      <ReadOnlyCanvas drawingData={drawingData}>
        <GuessesProvider></GuessesProvider>
      </ReadOnlyCanvas>
      <Toolbar
        brushRadius={9}
        setBrushRadius={() => ({})}
        brushColor={'black'}
        setBrushColor={() => ({})}
        clearCanvas={() => ({})}
        undo={() => ({})}
        isArtist={false}
        guess={guess}
        setGuess={setGuess}
        handleGuessSubmit={handleGuessSubmit}
      />
    </div>
  )
}
