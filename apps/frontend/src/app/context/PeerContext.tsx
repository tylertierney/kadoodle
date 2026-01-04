import Peer from 'peerjs'
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getLocalStorage } from '../utils/utils'
import { useGame } from './GameContext'

export interface StreamsIdentifier {
  [key: string]: MediaStream
}

interface PeerContextType {
  peer: Peer | undefined
  setPeer: Dispatch<SetStateAction<Peer | undefined>>
  peerId: string
  setPeerId: Dispatch<SetStateAction<string>>
  userStream: MediaStream | null
  setUserStream: (userStream: MediaStream | null) => void
  streams: StreamsIdentifier
  setStreams: Dispatch<SetStateAction<StreamsIdentifier>>
  micMuted: boolean
  setMicMuted: Dispatch<SetStateAction<boolean>>
  videoMuted: boolean
  setVideoMuted: Dispatch<SetStateAction<boolean>>
}

const initial: PeerContextType = {
  peer: undefined,
  setPeer: () => ({}),
  peerId: '',
  setPeerId: () => ({}),
  userStream: null,
  setUserStream: () => ({}),
  streams: {} as StreamsIdentifier,
  setStreams: () => ({}),
  micMuted: false,
  setMicMuted: () => ({}),
  videoMuted: false,
  setVideoMuted: () => ({}),
}

export const PeerContext = createContext<PeerContextType>(initial)

const PeerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [peer, setPeer] = useState<Peer>()
  const [peerId, setPeerId] = useState<string>('')
  const [userStream, setUserStream] = useState<MediaStream | null>(null)
  const [streams, setStreams] = useState<StreamsIdentifier>({})
  const { players } = useGame()
  const [micMuted, setMicMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)

  useEffect(() => {
    let existingPeerId = ''
    const currentPlayer = getLocalStorage('currentPlayer')
    if (currentPlayer?.peerId) existingPeerId = currentPlayer.peerId

    const peerInstance = new Peer(existingPeerId)
    peerInstance.on('open', (id: string) => {
      setPeerId(id)
    })
    setPeer(peerInstance)

    peerInstance.on('call', call => {
      if (userStream) {
        call.answer(userStream)
      } else {
        call.answer()
      }
      call.on('stream', (remoteStream: MediaStream) => {
        setStreams(streams => {
          const streamObj = { ...streams }
          streamObj[call.peer] = remoteStream
          return streamObj
        })
      })
    })
  }, [])

  useEffect(() => {
    if (!peer) return
    if (!userStream) return

    for (const player of players) {
      if (player.peerId !== peerId) {
        if (!player.peerId) return
        const call = peer.call(player.peerId, userStream)
        call.on('stream', (remoteStream: MediaStream) => {
          setStreams(streams => {
            const streamObj = { ...streams }
            streamObj[player.peerId] = remoteStream
            return streamObj
          })
        })
      }
    }
  }, [players.length, userStream])

  if (userStream) {
    if (userStream.getAudioTracks().length > 0) {
      micMuted
        ? (userStream.getAudioTracks()[0].enabled = false)
        : (userStream.getAudioTracks()[0].enabled = true)
    }

    if (userStream.getVideoTracks().length > 0) {
      videoMuted
        ? (userStream.getVideoTracks()[0].enabled = false)
        : (userStream.getVideoTracks()[0].enabled = true)
    }
  }

  const ctx: PeerContextType = {
    peer,
    setPeer,
    peerId,
    setPeerId,
    userStream,
    setUserStream,
    streams,
    setStreams,
    micMuted,
    setMicMuted,
    videoMuted,
    setVideoMuted,
  }

  return <PeerContext.Provider value={ctx}>{children}</PeerContext.Provider>
}

export default PeerProvider

export const usePeer = () => useContext(PeerContext)
