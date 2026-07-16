import { useEffect, useState } from "react";

function Button({
  clicks,
  setClicks,
  gameStarted,
  setGameStarted,
  gameOver,
  setGameOver,
}) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timer;

    if (timerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setTimerRunning(false);
      setGameStarted(false);
      setGameOver(true);
    }

    return () => clearTimeout(timer);
  }, [timerRunning, timeLeft]);

  const handleClick = () => {
    if (gameOver) return;

    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 200);

    if (!gameStarted) {
      setGameStarted(true);
      return;
    }

    if (!timerRunning) {
      setTimerRunning(true);
    }

    setClicks((prev) => prev + 1);
  };

  const restartGame = () => {
    setTimeLeft(10);
    setClicks(0);
    setGameStarted(false);
    setTimerRunning(false);
    setGameOver(false);
  };

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {gameStarted && <h2>Time Left: {timeLeft}s</h2>}

      <button
        onClick={handleClick}
        disabled={gameOver}
        style={{
          padding: "18px 40px",
          fontSize: "24px",
          borderRadius: "15px",
          border: "none",
          cursor: gameOver ? "not-allowed" : "pointer",
          backgroundColor: clicked ? "#e53935" : "#18af10",
          color: "white",
          transition: "all .15s ease",
          transform: clicked ? "scale(1.08)" : "scale(1)",
          boxShadow: clicked
            ? "0 0 25px rgba(229,57,53,.8)"
            : "0 6px 15px rgba(26,83,215,.35)",
        }}
      >
        {!gameStarted ? "Idk try me" : "Click!"}
      </button>
    </div>
  );
}

export default Button;
