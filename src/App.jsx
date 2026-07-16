import { useState } from "react";
import Hero from "./Hero";
import Button from "./Button";
import Leaderboard from "./Leaderboard";

function App() {
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const restartGame = () => {
    setClicks(0);
    setGameStarted(false);
    setGameOver(false);
  };

  return (
    <>
      {!gameOver ? (
        <>
          <Hero gameStarted={gameStarted} clicks={clicks} />

          <Button
            clicks={clicks}
            setClicks={setClicks}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        </>
      ) : (
        <Leaderboard
          clicks={clicks}
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
          restartGame={restartGame}
        />
      )}
    </>
  );
}

export default App;
