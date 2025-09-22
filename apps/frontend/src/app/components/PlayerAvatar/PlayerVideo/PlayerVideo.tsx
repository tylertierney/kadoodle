import { CharacterObj } from '@kadoodle/models'
import { useEffect, useRef } from 'react'
import { renderVideo } from '../../../utils/utils'
import styles from '../PlayerAvatar.module.scss'

interface Props {
  stream: MediaStream | null
  isMuted: boolean
  selectedCharacter: CharacterObj
}

export default function PlayerVideo({
  stream,
  isMuted,
  selectedCharacter,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (stream !== undefined && stream !== null) {
      renderVideo(stream, videoRef)
    }
  }, [stream])

  if (!stream || stream.getVideoTracks().length < 1) {
    return (
      <img
        src={`svg/${selectedCharacter.name}.svg`}
        style={{
          backgroundColor: selectedCharacter.color,
          margin: 0,
        }}
        className={styles.img}
        alt="avatar"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      className={`${styles.video}`}
      muted={isMuted}
      playsInline></video>
  )
}
