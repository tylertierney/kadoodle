import { Player, Turn } from '@kadoodle/models'
import { BsArrowRightCircle } from 'react-icons/bs'
import { IoMdRefresh } from 'react-icons/io'
import { useGame } from '../../context/GameContext'
import socket from '../../socket'
import { getNumberSuffix } from '../../utils/utils'
import Button from '../Button/Button'
import Letters from '../DrawingInterface/Letters/Letters'
import styles from './Scorecard.module.scss'

interface Props {
  turn: Turn
}

export default function Scorecard({ turn }: Props) {
  const { currentPlayer, roomCode, players } = useGame()
  let scoresArr: any = []

  if (!turn) return null

  if (turn.pointsThisTurn) {
    scoresArr = Object.entries(turn.pointsThisTurn)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .map((scoreItem: [string, number], idx: number) => {
        return (
          <li className={`${styles.scoreLI} ${styles.liAnimation}`} key={idx}>
            <span className={styles.place}>
              {idx + 1 + getNumberSuffix(idx + 1)}
            </span>
            <span className={styles.nickname}>{scoreItem[0]}</span>
            <span className={styles.pointDiff}>{`+${scoreItem[1]}`}</span>
          </li>
        )
      })
  }

  const finalScoresArr = [...players]
    .sort((a: Player, b: Player) => {
      return b.points - a.points
    })
    .map((player: Player, idx: number) => {
      return (
        <li className={`${styles.scoreLI} ${styles.liAnimation}`} key={idx}>
          <span className={styles.place}>
            {idx + 1 + getNumberSuffix(idx + 1)}
          </span>
          <span className={styles.nickname}>{player.nickname}</span>
          <span className={styles.pointDiff}>{player.points}</span>
        </li>
      )
    })

  console.log(turn.lastTurn)

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
      console.log('emitted startTurn')
      socket.emit('startTurn', roomCode)
    }
  }

  return (
    <div className={styles.scorecardContainer}>
      <div className={styles.titleAndLetters}>
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
        <ul className={styles.scorecardUL} style={{ paddingLeft: 0 }}>
          {turn.lastTurn ? finalScoresArr : scoresArr}
        </ul>
      </div>
      {currentPlayer?.isVIP && (
        <div className={styles.btnContainer}>
          <Button
            // fullWidth={false}
            onClick={() => handleSubmit(turn.lastTurn)}
            disabled={false}
            rightIcon={submitBtnIcon}
            variant="gradient">
            {submitBtnText}
          </Button>
        </div>
      )}
    </div>
  )
}
