import { Player } from '@kadoodle/models'
import { CSSProperties } from 'react'
import { StreamsIdentifier } from '../../../context/PeerContext'
import PlayerAvatar from '../../PlayerAvatar/PlayerAvatar'
import styles from './Sidebar.module.scss'

interface Props {
  players: Player[]
  streams: StreamsIdentifier
  side: 'left' | 'right'
  style?: CSSProperties
  className?: string
}

export default function Sidebar({
  players,
  streams,
  side,
  style,
  className = '',
}: Props) {
  const justifyContent = (idx: number) => {
    if (side === 'left') {
      return idx % 2 === 0 ? 'flex-start' : 'flex-end'
    } else {
      return idx % 2 === 0 ? 'flex-end' : 'flex-start'
    }
  }

  return (
    <div className={`${styles.sidebar} ${className}`} style={style}>
      {players.map((player, idx) => (
        <div
          key={idx}
          className={styles.avatarContainer}
          style={{ justifyContent: justifyContent(idx) }}>
          <PlayerAvatar player={player} streams={streams} />
        </div>
      ))}
    </div>
  )
}
