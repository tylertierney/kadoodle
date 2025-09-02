import { Player } from '@kadoodle/models'
import { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import CharacterSelect from './components/CharacterSelect/CharacterSelect'
import Footer from './components/Footer/Footer'
import JoinGame from './components/JoinGame/JoinGame'
import Navbar from './components/Navbar/Navbar'
import Welcome from './components/Welcome/Welcome'
import { GameStage, useGame } from './context/GameContext'
import socket from './socket'

export function App() {
  const { gameStage, setPlayers, setRoomCode } = useGame()

  // useEffect(() => {
  //   socket.on('connect_error', err => {
  //     console.log(err.message)
  //     socket.disconnect()
  //   })
  // }, [])

  useEffect(() => {
    socket.on('createLobby', (players: Player[]) => {
      setPlayers(players)
    })
    socket.on('joinLobby', (players: Player[], roomCode: string) => {
      setRoomCode(roomCode)
      setPlayers(players)
      console.log('joined a lobby:', roomCode)
    })
  }, [setPlayers, setRoomCode])

  const getGameSection = (gameStage: GameStage) => {
    switch (gameStage) {
      case 'initial':
        return <Welcome />
      case 'entering_roomCode':
        return <JoinGame />
      case 'characterSelect':
        return <CharacterSelect existingGame={false} />
      // case "characterSelect_creating_game":
      //   return <CharacterSelect existingGame={false} />;
      // case "characterSelect_joining_game":
      //   return <CharacterSelect existingGame={true} />;
      // case "waitingForPlayers":
      //   return <GameHome stage="waitingForPlayers" drawingData={drawingData} />;
      // case "wordSelection":
      //   return <GameHome stage="wordSelection" drawingData={drawingData} />;
      // case "playing":
      //   return <GameHome stage="playing" drawingData={drawingData} />;
      // case "roundOver":
      //   return <GameHome stage="roundOver" drawingData={drawingData} />;
      default:
        return <Welcome />
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar menuOpen={false} setMenuOpen={() => ({})} />
              {getGameSection(gameStage)}
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
