import { FC } from "react";
import { useGame } from "../../../context/GameContext";
import Timer from "../Timer/Timer";
import styles from "./Letters.module.css";

interface LettersProps {
  wordToDraw: string[];
  hidden: boolean;
  bounceAnimation: boolean;
  showTimer: boolean;
}

const Letters: FC<LettersProps> = ({
  wordToDraw,
  hidden,
  bounceAnimation,
  showTimer,
}) => {
  const { turns, players } = useGame();
  if (!wordToDraw) return null;

  return (
    <div
      className={styles.wordToDrawContainer}
      style={{ justifyContent: showTimer ? "space-between" : "center" }}
    >
      {showTimer && <Timer />}
      <div className={styles.lettersContainer}>
        {wordToDraw.map((letter: string, idx: number) => {
          return (
            <div
              key={idx}
              className={`${styles.letter} ${bounceAnimation && styles.bounce}`}
            >
              {hidden ? "" : letter}
            </div>
          );
        })}
      </div>
      {showTimer && (
        <span
          className={styles.spacer}
          style={{
            minWidth: "56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className={styles.roundText}>round</span>
          <span className={styles.roundNumber}>
            {turns.length}
            &nbsp;/&nbsp;
            {players.length}
          </span>
        </span>
      )}
    </div>
  );
};

export default Letters;
