import { Player } from '@kadoodle/models'
import { useEffect, useRef, useState } from 'react'
import { GiQueenCrown } from 'react-icons/gi'
import { useGame } from '../../context/GameContext'
import { StreamsIdentifier, usePeer } from '../../context/PeerContext'
import styles from './PlayerAvatar.module.scss'
import PlayerVideo from './PlayerVideo/PlayerVideo'

interface Props {
  player: Player
  streams: StreamsIdentifier
}

const crownBadge = (
  <div
    className={`
      ${styles.smallCircle}
      ${styles.crownBadge}
  `}>
    <GiQueenCrown style={{ width: '75%', height: '75%' }} />
  </div>
)

export default function PlayerAvatar({ player, streams }: Props) {
  const { userStream } = usePeer()
  const { currentPlayer } = useGame()
  const [pointDiff, setPointDiff] = useState(0)
  const prevScoreRef = useRef(player.points)

  useEffect(() => {
    const prevScore = prevScoreRef.current

    let timer: NodeJS.Timeout

    if (player.points !== prevScore) {
      const diff = player.points - prevScore

      if (diff !== 0) {
        setPointDiff(diff)
      }

      timer = setTimeout(() => {
        setPointDiff(0)
      }, 1500)
    }
    prevScoreRef.current = player.points

    return () => clearTimeout(timer)
  }, [player.points])

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        {player.isVIP && crownBadge}
        <div
          className={`
          ${styles.smallCircle}
          ${styles.points}
      `}>
          <span>{player.points}</span>
        </div>
        {pointDiff > 0 && (
          <div className={styles.scoreAnimation}>{`+${pointDiff}`}</div>
        )}
        {player.usingMedia ? (
          <PlayerVideo
            stream={
              player.id === currentPlayer?.id
                ? userStream
                : streams[player.peerId]
            }
            isMuted={player.id === currentPlayer?.id ? true : false}
            selectedCharacter={player.selectedCharacter}
          />
        ) : (
          <img
            className={`${styles.img}`}
            style={{
              backgroundColor: player.selectedCharacter.color,
            }}
            src={`svg/${player.selectedCharacter.name}.svg`}
            alt="avatar"
          />
        )}
      </div>
      <span className={styles.name}>{player.nickname}</span>
    </div>
  )
}
