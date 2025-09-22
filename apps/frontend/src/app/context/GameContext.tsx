import {
  generateRoomCode,
  mockPlayer,
  Player,
  Turn,
  words,
} from '@kadoodle/models'
import { randNumber } from '@ngneat/falso'
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

export type GameStage =
  | 'initial'
  | 'entering_roomCode'
  | 'characterSelect'
  | 'waitingForPlayers'
  | 'wordSelection'
  | 'playing'
  | 'roundOver'

// export interface Player {
//   nickname: string;
//   selectedCharacter: CharacterObj;
//   isVIP: boolean;
//   id: string;
//   peerId: string;
//   usingMedia: boolean;
//   stream?: MediaStream;
//   points: number;
// }

// export interface Turn {
//   word: string;
//   drawing: string;
//   artist: Player;
//   guesses: string[];
//   active: boolean;
//   possibleWords: string[];
//   pointsThisTurn: {
//     [key: string]: number;
//   };
//   lastTurn: boolean;
// }

export interface GameContextType {
  players: Player[]
  setPlayers: (players: Player[]) => void
  gameStage: GameStage
  setGameStage: (gameStage: GameStage) => void
  turns: Turn[]
  setTurns: (turns: Turn[]) => void
  currentPlayer: null | Player
  setCurrentPlayer: (currentPlayer: Player | null) => void
  timer: number
  usingMedia: boolean
  setUsingMedia: Dispatch<SetStateAction<boolean>>
  roomCode: string
  setRoomCode: Dispatch<SetStateAction<string>>
  roomCodeInput: string
  setRoomCodeInput: Dispatch<SetStateAction<string>>
}

export const mockGameContext = (): GameContextType => {
  let players = Array(randNumber({ min: 5, max: 12 }))
    .fill(null)
    .map(mockPlayer)

  const randIdxForHost = ~~(Math.random() * players.length)
  players = players.map((p, i) => ({ ...p, isVIP: i === randIdxForHost }))

  return {
    players,
    setPlayers: () => [],
    gameStage: 'playing',
    setGameStage: () => 'initial',
    turns: [new Turn(players[0], words)],
    setTurns: () => [],
    currentPlayer: players[0],
    setCurrentPlayer: () => ({}),
    timer: 90,
    usingMedia: false,
    setUsingMedia: () => ({}),
    roomCode: generateRoomCode(),
    setRoomCode: () => ({}),
    roomCodeInput: '',
    setRoomCodeInput: () => ({}),
  }
}

export const defaultGameContext: GameContextType = {
  players: [],
  setPlayers: () => [],
  gameStage: 'initial',
  setGameStage: () => 'initial',
  turns: [],
  setTurns: () => [],
  currentPlayer: null,
  setCurrentPlayer: () => ({}),
  timer: 90,
  usingMedia: false,
  setUsingMedia: () => ({}),
  roomCode: '',
  setRoomCode: () => ({}),
  roomCodeInput: '',
  setRoomCodeInput: () => ({}),
}

export const GameContext = createContext<GameContextType>(defaultGameContext)

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameStage, setGameStage] = useState<GameStage>('initial')
  const [players, setPlayers] = useState<Player[]>([])
  const [turns, setTurns] = useState<Turn[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<null | Player>(null)
  const [timer, setTimer] = useState(90)
  const [usingMedia, setUsingMedia] = useState<boolean>(false)
  const [roomCode, setRoomCode] = useState<string>('')
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')

  // useEffect(() => {
  //   const gameFromLocal = getLocalStorage()
  //   if (gameFromLocal) {
  //     if (gameFromLocal?.currentPlayer) {
  //       setCurrentPlayer(gameFromLocal.currentPlayer)
  //       setGameStage(gameFromLocal.gameStage)
  //       setPlayers(gameFromLocal.players)
  //       setTurns(gameFromLocal.turns)
  //       setRoomCode(gameFromLocal.roomCode)

  //       socket.emit('getCurrentGame', gameFromLocal.roomCode)
  //     }
  //   }

  //   socket.on('setTimer', (time: number) => {
  //     setTimer(time)
  //   })
  // }, [])

  useEffect(() => {
    const context = {
      players,
      gameStage,
      turns,
      currentPlayer,
      roomCode,
    }
    localStorage.setItem('doodle-context', JSON.stringify(context))
  }, [
    players.length,
    gameStage,
    turns.length,
    currentPlayer,
    turns[turns.length - 1]?.drawing,
    roomCode,
  ])

  const ctx: GameContextType = {
    players,
    setPlayers,
    gameStage,
    setGameStage,
    turns,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
    timer,
    usingMedia,
    setUsingMedia,
    roomCode,
    setRoomCode,
    roomCodeInput,
    setRoomCodeInput,
  }
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>
}

export default GameProvider

export const useGame = () => useContext(GameContext)
