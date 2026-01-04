import { Dispatch, SetStateAction } from 'react'
import { BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { useGame } from '../../context/GameContext'
import { usePeer } from '../../context/PeerContext'
import Button from '../Button/Button'
import KadoodleTextSVG from '../KadoodleTextSVG/KadoodleTextSVG'
import styles from './Navbar.module.scss'

interface NavbarProps {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const { micMuted, setMicMuted, videoMuted, setVideoMuted } = usePeer()
  const { usingMedia } = useGame()

  return (
    <div className={styles.navContainer}>
      <KadoodleTextSVG style={{ height: '40px' }} />
      <div className={styles.controlsContainer}>
        {usingMedia && (
          <>
            <Button
              showDisabled={videoMuted}
              size="lg"
              rounded={true}
              onClick={() => setVideoMuted(!videoMuted)}>
              {videoMuted ? <BsCameraVideoOffFill /> : <BsCameraVideoFill />}
            </Button>
            <Button
              showDisabled={micMuted}
              size="lg"
              rounded={true}
              onClick={() => setMicMuted(!micMuted)}>
              {micMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </Button>
          </>
        )}
        <Button size="lg" rounded={true} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </Button>
      </div>
    </div>
  )
}
