import { characters, generateRoomCode, Player } from '@kadoodle/models'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { BsArrowRightCircle, BsCameraVideo } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { GiQueenCrown } from 'react-icons/gi'
import { useGame } from '../../context/GameContext'
import { usePeer } from '../../context/PeerContext'
import socket from '../../socket'
import { renderVideo } from '../../utils/utils'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Tabs from '../Tabs/Tabs'
import AvatarArray from './AvatarArray/AvatarArray'
import styles from './CharacterSelect.module.scss'
// import TabsMenu from './TabsMenu/TabsMenu'

interface CharacterSelectProps {
  existingGame: boolean
}

export default function CharacterSelect({
  existingGame,
}: CharacterSelectProps) {
  const {
    setGameStage,
    setCurrentPlayer,
    usingMedia,
    setUsingMedia,
    roomCode,
    setRoomCode,
    roomCodeInput,
  } = useGame()
  const { peerId, setUserStream, userStream, setStreams } = usePeer()
  const [nickname, setNickname] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const userVideoRef = useRef<HTMLVideoElement>(null)
  const [errorText, setErrorText] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])

  const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7)
  }

  const handleSubmit = () => {
    if (userStream) {
      setStreams(streams => {
        const streamObj = { ...streams }
        streamObj[peerId] = userStream
        return streamObj
      })
    }
    const playerObj: Player = {
      nickname,
      selectedCharacter,
      isVIP: existingGame ? false : true,
      id: generateId(),
      peerId,
      usingMedia,
      points: 0,
    }
    setCurrentPlayer(playerObj)
    existingGame
      ? socket.emit('joinLobby', playerObj, roomCodeInput)
      : socket.emit('createLobby', playerObj, roomCode)
    setGameStage('waitingForPlayers')
  }

  const crownBadge = (
    <div className="crownBadge">
      <GiQueenCrown style={{ width: '75%', height: '75%' }} />
    </div>
  )

  const getUserMedia = useCallback(() => {
    const devicesObj = {
      video: false,
      audio: false,
    }
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        devices.forEach((device: MediaDeviceInfo) => {
          if (device.kind === 'audioinput') {
            devicesObj.audio = true
          }
          if (device.kind === 'videoinput') {
            devicesObj.video = true
          }
        })
        navigator.mediaDevices
          .getUserMedia(devicesObj)
          .then((stream: MediaStream) => {
            setUserStream(stream)
            setUsingMedia(true)
            renderVideo(stream, userVideoRef as RefObject<HTMLVideoElement>)
          })
          .catch(err => {
            setUsingMedia(false)
            if (err.name === 'NotFoundError') {
              setErrorText(
                'Requested media device not found. Check your camera and microphone, or use an avatar instead.',
              )
            }
          })
      })
  }, [setUserStream, setUsingMedia])

  useEffect(() => {
    if (activeTab === 1) {
      getUserMedia()
    }
    if (activeTab === 0) {
      setUsingMedia(false)
    }
  }, [activeTab, getUserMedia, setUsingMedia])

  useEffect(() => {
    if (!existingGame) {
      setRoomCode(generateRoomCode())
    }
  }, [existingGame, setRoomCode])

  return (
    <div className={styles.characterSelect}>
      <div className={`${styles.menu} ${styles.first}`}>
        <div className={styles.controls}>
          <h2
            className={styles.h2}
            style={{ margin: 0, color: 'white', marginBottom: '1rem' }}>
            Choose a nickname
          </h2>
          <Input
            type="text"
            variant="secondary"
            placeholder="My Nickname"
            maxLength={16}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            style={{ marginBottom: '3rem' }}
          />
          <Tabs
            active={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              {
                label: (
                  <span className={styles.tabLabel}>
                    <FaRegUserCircle
                      fontSize={'30px'}
                      style={{ marginRight: '0.75rem' }}
                    />
                    <span>Use Avatar</span>
                  </span>
                ),
                content: (
                  <AvatarArray
                    setSelectedCharacter={setSelectedCharacter}
                    characters={characters}
                    selectedCharacter={selectedCharacter}
                  />
                ),
              },
              {
                label: (
                  <span className={styles.tabLabel}>
                    <BsCameraVideo
                      fontSize={'30px'}
                      style={{ marginRight: '0.75rem' }}
                    />
                    <span>Use Video</span>
                  </span>
                ),
                content: <p className={styles.errorText}>{errorText}</p>,
              },
            ]}></Tabs>
        </div>
        <div className={styles.selectedCharacterContainer}>
          {activeTab === 0 ? (
            <img
              className={styles.selectedCharacterImg}
              src={`svg/${selectedCharacter.name}.svg`}
              style={{
                backgroundColor: selectedCharacter?.color,
                margin: 0,
              }}
              alt="Avatar"
            />
          ) : (
            <video
              className={`${styles.selectedCharacterImg} ${styles.videoHTML}`}
              autoPlay={true}
              ref={userVideoRef}
              playsInline
              muted></video>
          )}
          <p
            style={{
              fontSize: '1.6rem',
              minHeight: '2.2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}
            className={styles.selectedCharacterText}>
            {nickname}
          </p>
        </div>
      </div>
      <div className={`${styles.menu} ${styles.goToLobbyMenu}`}>
        {!existingGame && (
          <>
            {crownBadge}
            <p
              style={{
                fontSize: '1.2rem',
                flexBasis: '400px',
                marginBottom: '0.6rem',
              }}>
              You are the host, so you'll have control over the game options
            </p>
          </>
        )}
        <Button
          size="lg"
          variant="gradient"
          rightIcon={<BsArrowRightCircle fontSize="1.4rem" />}
          onClick={() => handleSubmit()}
          style={{ marginLeft: 'auto' }}
          disabled={!nickname.length}>
          Go To Lobby
        </Button>
      </div>
    </div>
  )
}
