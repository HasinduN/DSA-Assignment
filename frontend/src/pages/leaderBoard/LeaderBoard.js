// frontend/src/pages/leaderboard/Leaderboard.js
import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../../services/ApiService";
import "./LeaderBoard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderBoard();
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