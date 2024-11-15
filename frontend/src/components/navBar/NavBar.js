// frontend/src/components/navBar/NavBar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <button onClick={() => navigate("/dashboard")} className="navbar-button logo-button">
          BRAIN BANANA
        </button>
      </div>
      <ul className="navbar-links">
        <li>
          <button onClick={() => navigate("/game")} className="navbar-button">
            GAME
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/profile")} className="navbar-button">
            PROFILE
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/leaderboard")} className="navbar-button">
            LEADERBOARD
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="navbar-button logout-button">
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;