import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "..//..//context/AuthContext"
import "./NavBar.css";

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">Brain Banana</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
