import { Guess } from '@kadoodle/models'
import { randUuid } from '@ngneat/falso'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Guesses from '../components/Guesses/Guesses'
import socket from '../socket'

interface GuessContextType {
  addGuess: (guess: Guess) => void
  removeGuess: (id: string) => void
}

const GuessesContext = createContext<GuessContextType>({
  addGuess: () => ({}),
  removeGuess: () => ({}),
})

const GuessesProvider = ({ children }: PropsWithChildren) => {
  const [guesses, setGuesses] = useState<Guess[]>([])

  const addGuess = useCallback(
    (guess: Guess) => {
      setGuesses(guesses => [
        ...guesses,
        {
          id: randUuid(),
          nickname: guess.nickname,
          text: guess.text,
          isCorrect: false,
        },
      ])
    },
    [setGuesses],
  )

  const removeGuess = useCallback(
    (id: string) => {
      setGuesses(guesses => guesses.filter(t => t.id !== id))
    },
    [setGuesses],
  )

  useEffect(() => {
    if (guesses.length > 0) {
      const timer = setTimeout(
        () => setGuesses(guesses => guesses.slice(1)),
        3000,
      )
      return () => clearTimeout(timer)
    }
  }, [guesses])

  useEffect(() => {
    const callback = (guess: Guess) => {
      addGuess(guess)
    }
    socket.on('guess', callback)

    return () => {
      socket.off('guess', callback)
    }
  }, [addGuess])

  return (
    <GuessesContext.Provider value={{ addGuess, removeGuess }}>
      {children}
      <Guesses guesses={guesses} setGuesses={setGuesses} />
    </GuessesContext.Provider>
  )
}

export default GuessesProvider

export const useGuesses = () => useContext(GuessesContext)
