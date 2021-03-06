import { Stack, Text, Title } from "@mantine/core";
import styles from "./CharacterSelect.module.css";
import { CharacterObj, characters } from "./characters";
import { useEffect, useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Player, useGame } from "../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";
import socket from "../../socket";
import GradientBtn from "../GradientBtn/GradientBtn";
import TabsMenu from "./TabsMenu/TabsMenu";
import { generateRoomCode, renderVideo } from "../../utils/utils";
import { usePeer } from "../../context/PeerContext";

interface CharacterSelectProps {
  existingGame: boolean;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ existingGame }) => {
  const {
    setGameStage,
    setCurrentPlayer,
    gameStage,
    usingMedia,
    setUsingMedia,
    roomCode,
    setRoomCode,
    roomCodeInput,
  } = useGame();
  const { peerId, setUserStream, userStream, setStreams } = usePeer();
  const [charactersArr, setCharactersArr] =
    useState<CharacterObj[]>(characters);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [errorText, setErrorText] = useState("");

  const handleCharacterSelect = (name: string) => {
    setCharactersArr(
      characters.map((item: CharacterObj) => {
        item.isSelected = item.name === name ? true : false;
        return item;
      })
    );
  };

  const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  const handleSubmit = () => {
    if (userStream) {
      setStreams((streams) => {
        let streamObj = { ...streams };
        streamObj[peerId] = userStream;
        return streamObj;
      });
    }
    const playerObj: Player = {
      nickname,
      selectedCharacter,
      isVIP: existingGame ? false : true,
      id: generateId(),
      peerId,
      usingMedia,
      points: 0,
    };
    setCurrentPlayer(playerObj);
    existingGame
      ? socket.emit("joinLobby", playerObj, roomCodeInput)
      : socket.emit("createLobby", playerObj, roomCode);
    setGameStage("waitingForPlayers");
  };

  const selectedCharacter = charactersArr.filter((item: CharacterObj) => {
    return item.isSelected;
  })[0];

  const crownBadge = (
    <div className="crownBadge">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  const getUserMedia = () => {
    let devicesObj = {
      video: false,
      audio: false,
    };
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        devices.forEach((device: MediaDeviceInfo) => {
          if (device.kind === "audioinput") {
            devicesObj.audio = true;
          }
          if (device.kind === "videoinput") {
            devicesObj.video = true;
          }
        });
        navigator.mediaDevices
          .getUserMedia(devicesObj)
          .then((stream: MediaStream) => {
            setUserStream(stream);
            setUsingMedia(true);
            renderVideo(stream, userVideoRef);
          })
          .catch((err) => {
            setUsingMedia(false);
            if (err.name === "NotFoundError") {
              setErrorText(
                "Requested media device not found. Check your camera and microphone, or use an avatar instead."
              );
            }
          });
      });
  };

  useEffect(() => {
    if (activeTab === 1) {
      getUserMedia();
    }
    if (activeTab === 0) {
      setUsingMedia(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!existingGame) {
      setRoomCode(generateRoomCode());
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.wrappingContainer}>
          <Stack style={{ flexGrow: 1, width: "50%" }}>
            <Stack spacing="xs" style={{ marginBottom: "1rem" }}>
              <Title order={2} style={{ margin: 0, color: "white" }}>
                Choose a nickname
              </Title>
              <input
                type="text"
                placeholder="CoolPerson123"
                className={styles.nicknameInput}
                maxLength={16}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
              />
            </Stack>
            <TabsMenu
              charactersArr={charactersArr}
              handleCharacterSelect={handleCharacterSelect}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              errorText={errorText}
            />
          </Stack>
          <Stack
            align="center"
            justify="center"
            style={{
              gap: 0,
              minWidth: "300px",
              minHeight: "180px",
              width: "50%",
            }}
          >
            {activeTab === 0 ? (
              <img
                className={styles.selectedCharacterImg}
                src={selectedCharacter?.icon}
                style={{
                  backgroundColor: selectedCharacter?.color,
                  margin: 0,
                }}
              />
            ) : (
              <video
                className={`${styles.selectedCharacterImg} ${styles.videoHTML}`}
                autoPlay={true}
                ref={userVideoRef}
                playsInline
                muted
              ></video>
            )}
            <Text
              weight="bold"
              align="center"
              size="lg"
              color="white"
              style={{ fontSize: "1.6rem", minHeight: "2.2rem" }}
              className={styles.selectedCharacterText}
            >
              {nickname}
            </Text>
          </Stack>
        </div>
      </div>
      <div
        className={`${styles.menuContainer} ${styles.goToLobbyMenu}`}
        style={{
          justifyContent:
            gameStage === "characterSelect_creating_game"
              ? "space-between"
              : "flex-end",
        }}
      >
        {gameStage === "characterSelect_creating_game" && (
          <>
            {crownBadge}
            <Text
              style={{
                fontSize: "1.2rem",
                flexBasis: "400px",
                marginBottom: "0.6rem",
              }}
            >
              You are the VIP, so you'll have control over the game options
            </Text>
          </>
        )}
        <GradientBtn
          fullWidth={false}
          rightIcon={<BsArrowRightCircle fontSize="1.4rem" />}
          onClick={() => handleSubmit()}
          style={{ marginLeft: "auto" }}
          disabled={false}
        >
          Go To Lobby
        </GradientBtn>
      </div>
    </div>
  );
};

export default CharacterSelect;
