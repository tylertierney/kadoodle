import { Guess } from '@kadoodle/models'
import React, { Dispatch, FC } from 'react'
import { useGame } from '../../context/GameContext'
import { getLetterValue } from '../../utils/utils'
import styles from './Guesses.module.scss'

export interface Props {
  guesses: Guess[]
  setGuesses: Dispatch<React.SetStateAction<Guess[]>>
}

const Guesses = ({ guesses, setGuesses }: Props) => {
  return (
    <div className={styles.guessContainer} data-testid="Guesses">
      {guesses.map((guess: Guess, idx: number) => {
        return <GuessText key={idx} guess={guess} />
      })}
    </div>
  )
}

export default Guesses

interface GuessProps {
  guess: Guess
}
const GuessText: FC<GuessProps> = ({ guess }) => {
  const { turns } = useGame()

  const wordToGuess = turns[turns.length - 1].word

  const lettersArr = guess.text.split('').map((letter: string, idx: number) => {
    const color = getLetterValue(letter, wordToGuess, idx)
    return (
      <span key={idx} style={{ color }}>
        {letter}
      </span>
    )
  })

  const isCorrect = wordToGuess.toLowerCase() === guess.text.toLowerCase()

  return (
    <div
      className={`${styles.guess} ${isCorrect ? styles.bounce : styles.shake}`}
      style={{
        color: isCorrect ? 'green' : 'inherit',
      }}>
      {isCorrect ? <span>I got it!</span> : <span>{lettersArr}</span>}
      <span>-</span>
      <span style={{ fontWeight: 'bold' }}>{guess.nickname}</span>
    </div>
  )
}
