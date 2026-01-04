import { Player, Room, Turn } from '@kadoodle/models'
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import CharacterSelect from './components/CharacterSelect/CharacterSelect'
import ArtistInterface from './components/DrawingInterface/ArtistInterface/ArtistInterface'
import GuesserInterface from './components/DrawingInterface/GuesserInterface/GuesserInterface'
import Footer from './components/Footer/Footer'
import GameHome from './components/GameHome/GameHome'
import JoinGame from './components/JoinGame/JoinGame'
import Lobby from './components/Lobby/Lobby'
import Navbar from './components/Navbar/Navbar'
import NavMenu from './components/NavMenu/NavMenu'
import Scorecard from './components/Scorecard/Scorecard'
import Welcome from './components/Welcome/Welcome'
import WordSelection from './components/WordSelection/WordSelection'
import { GameStage, useGame } from './context/GameContext'
import socket from './socket'

export function App() {
  const {
    gameStage,
    setPlayers,
    setRoomCode,
    turns,
    currentPlayer,
    setGameStage,
    setTurns,
    endGame,
  } = useGame()
  const [drawingData, setDrawingData] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const activeTurn = turns[turns.length - 1]
  const isArtist = currentPlayer?.id === activeTurn?.artist?.id

  // useEffect(() => {
  //   socket.on('connect_error', err => {
  //     console.log(err.message)
  //     socket.disconnect()
  //   })
  // }, [])

  useEffect(() => {
    socket.on('draw', (drawingData: string, turns: Turn[]) => {
      setTurns(turns)
      setDrawingData(drawingData)
    })
    socket.on('createLobby', (players: Player[]) => {
      setPlayers(players)
    })
    socket.on('joinLobby', (players: Player[], roomCode: string) => {
      setRoomCode(roomCode)
      setPlayers(players)
    })
    socket.on('startGame', (turns: Turn[], players: Player[]) => {
      if (currentPlayer) setGameStage('wordSelection')
      setTurns(turns)
      setPlayers(players)
    })
    socket.on('selectWord', (turns: Turn[]) => {
      setTurns(turns)
      setGameStage('playing')
    })
    socket.on('getCurrentGame', (game: Room | undefined) => {
      if (!game) {
        endGame()
        return
      }
      setRoomCode(game.roomCode)
      setTurns(game.turns)
      setPlayers(game.players)
    })
    socket.on('addedPoints', players => {
      setPlayers(players)
    })
    socket.on('endTurn', (turns: Turn[]) => {
      setTurns(turns)
      setGameStage('roundOver')
    })
    socket.on('startTurn', (turns: Turn[]) => {
      setTurns(turns)
      setGameStage('wordSelection')
    })
    socket.on('endGame', () => {
      endGame()
    })
    socket.on('leaveGame', (player, players) => {
      setPlayers(players)
      if (player.id === currentPlayer?.id) {
        endGame()
      }
    })
  }, [setPlayers, setRoomCode, setGameStage, currentPlayer, setTurns])

  const getGameSection = (gameStage: GameStage, isArtist: boolean) => {
    switch (gameStage) {
      case 'initial':
        return <Welcome />
      case 'entering_roomCode':
        return <JoinGame />
      case 'characterSelect_creating_game':
        return <CharacterSelect existingGame={false} />
      case 'characterSelect_joining_game':
        return <CharacterSelect existingGame={true} />
      case 'waitingForPlayers':
        return (
          <GameHome>
            <Lobby />
          </GameHome>
        )
      case 'wordSelection':
        return (
          <GameHome>
            <WordSelection isArtist={isArtist} />
          </GameHome>
        )
      case 'playing':
        return (
          <GameHome>
            {isArtist ? (
              <ArtistInterface />
            ) : (
              <GuesserInterface drawingData={drawingData} />
            )}
          </GameHome>
        )
      case 'roundOver':
        return (
          <GameHome>
            <Scorecard turn={turns.at(-1) as Turn} />
          </GameHome>
        )
      default:
        return <Welcome />
    }
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        closeOnClick={true}
        autoClose={3000}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar menuOpen={false} setMenuOpen={setMenuOpen} />
              {getGameSection(gameStage, isArtist)}
              <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
