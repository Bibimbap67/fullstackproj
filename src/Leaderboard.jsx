import { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard({ clicks, leaderboard, setLeaderboard, restartGame }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/leaderboard")
      .then((res) => {
        setLeaderboard(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveScore = async () => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      setError("Please enter your name.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/leaderboard", {
        name: trimmedName,
        score: clicks,
      });

      const res = await axios.get("http://localhost:5000/leaderboard");
      setLeaderboard(res.data);
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Could not save score. Make sure the server is running.");
    } finally {
      setSaving(false);
    }
  };

  let reactionImage = "";
  let reactionText = "";

  if (clicks < 50) {
    reactionImage = "src/assets/roast1.jpg";
    reactionText = "Yeah... you suck.";
  } else if (clicks < 100) {
    reactionImage = "src/assets/roast2.jpg";
    reactionText = "That was decent. Get better, lmao.";
  } else {
    reactionImage = "src/assets/roast3.jpg";
    reactionText = "I'm not familiar with your game. Damn.";
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "500px",
          border: "1px solid #ddd",
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Leaderboard
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <img
            src={reactionImage}
            alt="Reaction"
            style={{
              width: "220px",
              marginBottom: "15px",
            }}
          />

          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              margin: 0,
            }}
          >
            {reactionText}
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Your Score
        </p>

        <h1
          style={{
            textAlign: "center",
            fontSize: "75px",
            margin: "0 0 30px",
          }}
        >
          {clicks}
        </h1>

        {!saved && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveScore();
              }}
              disabled={saving}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            <button
              type="button"
              onClick={saveScore}
              disabled={saving}
              style={{
                padding: "12px 18px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "white",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {error && (
          <p
            style={{
              color: "#c62828",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid #ddd",
              }}
            >
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                }}
              >
                Rank
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                }}
              >
                Player
              </th>

              <th
                style={{
                  textAlign: "right",
                  padding: "12px",
                }}
              >
                Score
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#888",
                  }}
                >
                  No scores yet.
                </td>
              </tr>
            ) : (
              leaderboard.map((player, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "14px" }}>
                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : index + 1}
                  </td>

                  <td style={{ padding: "14px" }}>{player.name}</td>

                  <td
                    style={{
                      padding: "14px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    {player.score}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          onClick={restartGame}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
