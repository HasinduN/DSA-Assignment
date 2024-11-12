/*// src/pages/Leaderboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://marcconrad.com/uob/banana/leaderboard"
        );
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      <ul style={styles.list}>
        {leaderboard.map((entry, index) => (
          <li key={index} style={styles.listItem}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "5px 0",
  },
};

export default Leaderboard; */

// frontend/src/pages/leaderboard/Leaderboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeaderBoard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaderboard");
        setLeaderboard(response.data); // Set leaderboard data
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="board-card">
      <h2 className="title">Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span className="username">{entry.username}</span>
            <span className="score">{entry.highScore} points</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Leaderboard;