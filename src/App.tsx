import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import GameHome from "./components/GameHome/GameHome";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import { Player, Turn, useGame } from "./context/GameContext";
import { usePeer } from "./context/PeerContext";
import socket from "./socket";
import Footer from "./components/Footer/Footer";
import NavMenu from "./components/NavMenu/NavMenu";

function App() {
  const {
    gameStage,
    setGameStage,
    setPlayers,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
    setRoomCode,
  } = useGame();
  const [drawingData, setDrawingData] = useState("");
  const { peer } = usePeer();
  const [menuOpen, setMenuOpen] = useState(false);

  const endGame = () => {
    localStorage.removeItem("doodle-context");
    setPlayers([]);
    setGameStage("initial");
    setTurns([]);
    setCurrentPlayer(null);
  };

  useEffect(() => {
    socket.on("draw", (drawingData: string, turns: Turn[]) => {
      setTurns(turns);
      setDrawingData(drawingData);
    });
    socket.on("createLobby", (players: any) => {
      setPlayers(players);
    });
    socket.on("joinLobby", (players: any, roomCode: any) => {
      setRoomCode(roomCode);
      setPlayers(players);
    });
    socket.on("startGame", (turns: Turn[], players: Player[]) => {
      if (currentPlayer) setGameStage("wordSelection");
      setTurns(turns);
      setPlayers(players);
    });
    socket.on("selectWord", (turns: Turn[]) => {
      setTurns(turns);
      setGameStage("playing");
    });
    socket.on("getCurrentGame", (game: any) => {
      if (!game) {
        endGame();
        return;
      }
      setRoomCode(game.roomCode);
      setTurns(game.turns);
      setPlayers(game.players);
    });
    socket.on("addedPoints", (players) => {
      setPlayers(players);
    });
    socket.on("endTurn", (turns: any) => {
      setTurns(turns);
      setGameStage("roundOver");
    });
    socket.on("startTurn", (turns: any) => {
      setTurns(turns);
      setGameStage("wordSelection");
    });
    socket.on("endGame", () => {
      endGame();
    });
  }, [currentPlayer?.id, peer]);

  const getGameSection = (gameStage: string) => {
    switch (gameStage) {
      case "initial":
        return <Welcome enteringRoomCode={false} />;
      case "entering_roomCode":
        return <Welcome enteringRoomCode={true} />;
      case "characterSelect_creating_game":
        return <CharacterSelect existingGame={false} />;
      case "characterSelect_joining_game":
        return <CharacterSelect existingGame={true} />;
      case "waitingForPlayers":
        return <GameHome stage="waitingForPlayers" drawingData={drawingData} />;
      case "wordSelection":
        return <GameHome stage="wordSelection" drawingData={drawingData} />;
      case "playing":
        return <GameHome stage="playing" drawingData={drawingData} />;
      case "roundOver":
        return <GameHome stage="roundOver" drawingData={drawingData} />;
      default:
        return <Welcome enteringRoomCode={false} />;
    }
  };

  return (
    <div className="appContainer">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {getGameSection(gameStage)}
      <Footer />
      <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

export default App;
