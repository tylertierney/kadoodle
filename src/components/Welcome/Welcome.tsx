import styles from "./Welcome.module.css";
import PaperSVG from "../PaperSVG/PaperSVG";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { BiPlusCircle } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useGame } from "../../context/GameContext";
import GradientBtn from "../GradientBtn/GradientBtn";
import KadoodleTextSVG from "../KadoodleTextSVG/KadoodleTextSVG";
import { useState } from "react";

interface WelcomeProps {
  enteringRoomCode: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ enteringRoomCode }) => {
  const { setGameStage, roomCodeInput, setRoomCodeInput } = useGame();

  // const [newRoomCode, setNewRoomCode] = useState("");

  return (
    <Stack align="center" justify="center" className={styles.welcomeBackground}>
      <PaperSVG />
      <Stack
        align="center"
        justify="center"
        className={styles.welcomeContainer}
      >
        {enteringRoomCode ? (
          <>
            <div className={styles.roomCodeContainer}>
              <Title align="center" style={{ fontSize: "2.1rem", margin: 0 }}>
                Enter a room code
              </Title>
              <input
                className={styles.roomCodeInput}
                type="text"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                maxLength={4}
              />
            </div>
            <GradientBtn
              fullWidth={true}
              rightIcon={<BsArrowRightCircle size="1.4rem" />}
              onClick={() => setGameStage("characterSelect_joining_game")}
            >
              Join Game
            </GradientBtn>
          </>
        ) : (
          <>
            <div className={styles.headerContainer}>
              <Title
                align="center"
                style={{ fontSize: "2.1rem", margin: 0 }}
                order={1}
              >
                Welcome to&nbsp;
              </Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                <KadoodleTextSVG />
                <Title
                  align="center"
                  style={{
                    fontSize: "3.6rem",
                    margin: 0,
                    transform: "translate(-6px, -3px)",
                    color: "var(--lightorange)",
                  }}
                  order={1}
                >
                  !
                </Title>
              </div>
            </div>
            <Text
              size="lg"
              align="center"
              style={{ maxWidth: "500px", padding: "0 0.5rem" }}
              component="p"
            >
              Kadoodle is a multiplayer drawing + guessing game. Create a lobby
              and invite friends to your game, or join an existing one.
            </Text>
            <Group position="center">
              <Button
                variant="outline"
                color="orange"
                radius="md"
                size="lg"
                rightIcon={<BsArrowRightCircle size="1.4rem" />}
                // onClick={() => setGameStage("characterSelect_joining_game")}
                onClick={() => setGameStage("entering_roomCode")}
              >
                Join Game
              </Button>
              <GradientBtn
                fullWidth={false}
                rightIcon={<BiPlusCircle size="1.7rem" />}
                onClick={() => setGameStage("characterSelect_creating_game")}
              >
                Create New Game
              </GradientBtn>
            </Group>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Welcome;
