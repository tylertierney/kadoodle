import { Turn } from '@kadoodle/models'
import { BsArrowRightCircle } from 'react-icons/bs'
import { IoMdRefresh } from 'react-icons/io'
import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import Button from '../Button/Button'
import Letters from '../DrawingInterface/Letters/Letters'
import styles from './Scorecard.module.scss'
import ScorecardList, { ScorecardListItem } from './ScorecardList/ScorecardList'

interface Props {
  turn: Turn
}

export default function Scorecard({ turn }: Props) {
  const { currentPlayer, roomCode, players } = useGame()

  if (!turn) return null

  const scoresThisTurn: ScorecardListItem[] = Object.entries(
    turn.pointsThisTurn ?? {},
  ).map(([nickname, points]) => ({
    nickname,
    points,
  }))

  const finalScoresArr: ScorecardListItem[] = [...players].map(
    ({ nickname, points }) => ({ nickname, points }),
  )

  const submitBtnText = turn.lastTurn ? 'Play Again?' : 'Next Round'
  const submitBtnIcon = turn.lastTurn ? (
    <IoMdRefresh size="1.6rem" style={{ transform: 'scaleX(-1)' }} />
  ) : (
    <BsArrowRightCircle fontSize="1.4rem" />
  )

  const title = turn.lastTurn
    ? ['Game over! ', 'the word was...']
    : ["Time's up! ", 'the word was...']

  const handleSubmit = (isLastTurn: boolean) => {
    if (isLastTurn) {
      socket.emit('restartGame', roomCode)
    } else {
      socket.emit('startTurn', roomCode)
    }
  }

  return (
    <div
      className={styles.scorecardContainer}
      style={{
        justifyContent: currentPlayer?.isVIP ? 'space-around' : 'center',
      }}>
      <div
        className={styles.titleAndLetters}
        style={{
          marginBottom: currentPlayer?.isVIP ? 'unset' : '3rem',
        }}>
        <div className={styles.title}>
          <span style={{ fontSize: '1.6rem' }} className={styles.titleSpans}>
            {title[0]}&nbsp;
          </span>
          <span style={{ fontSize: '1.6rem' }} className={styles.titleSpans}>
            {title[1]}
          </span>
        </div>
        <Letters bounceAnimation={true} hidden={false} wordToDraw={turn.word} />
      </div>
      <div className={styles.titleAndUL}>
        {turn.lastTurn && (
          <h2
            style={{
              margin: '1rem 0 0 0',
              borderBottom: '2px solid',
              textAlign: 'center',
            }}>
            Final Results
          </h2>
        )}
        <ScorecardList
          players={turn.lastTurn ? finalScoresArr : scoresThisTurn}
          style={{ paddingLeft: 0 }}
        />
      </div>
      {currentPlayer?.isVIP && (
        <div className={styles.btnContainer}>
          <Button
            onClick={() => handleSubmit(turn.lastTurn)}
            disabled={false}
            rightIcon={submitBtnIcon}
            variant="gradient"
            size="lg">
            {submitBtnText}
          </Button>
        </div>
      )}
    </div>
  )
}
