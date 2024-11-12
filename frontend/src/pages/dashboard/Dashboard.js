//frontend/src/pages/dashboard/Dashboard.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("../login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">BRAIN BANANA</h2>
      <button onClick={() => navigate("../game")} className="dashboard-button">
        Start Game
      </button>
      <button onClick={() => navigate("../profile")} className="dashboard-button">
        Profile
      </button>
      <button onClick={() => navigate("../leaderboard")} className="dashboard-button">
        Leaderboard
      </button>
      <button onClick={handleLogout} className="dashboard-button logout-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;