import { Player } from '@kadoodle/models'
import { useEffect, useRef, useState } from 'react'
import { GiQueenCrown } from 'react-icons/gi'
import { useGame } from '../../context/GameContext'
import { StreamsIdentifier, usePeer } from '../../context/PeerContext'
import styles from './PlayerAvatar.module.scss'
import PlayerVideo from './PlayerVideo/Player'

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
  const [initialScore, setInitialScore] = useState(player.points)
  const notInitialRender = useRef(false)
  const [pointDiff, setPointDiff] = useState(0)

  useEffect(() => {
    // let timer: NodeJS.Timeout

    if (notInitialRender.current === true) {
      setPointDiff(player.points - initialScore)
      setInitialScore(player.points)
      const timer = setTimeout(() => {
        setPointDiff(0)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      notInitialRender.current = true
    }

    // return () => clearTimeout(timer)
  }, [player.points])

  return (
    <div className={styles.container}>
      {player.isVIP && crownBadge}
      <div
        className={`
          ${styles.smallCircle}
          ${styles.points}
      `}>
        <span>{player.points}</span>
      </div>
      <span style={{ fontSize: 'large', color: 'red' }}>{pointDiff}</span>
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
      <span className={styles.name}>{player.nickname}</span>
    </div>
  )
}
