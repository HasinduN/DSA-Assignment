import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // Import CSS file for styling

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Brain Banana!</h1>
      <p></p>
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="welcome-button">
          Login
        </button>
        <button onClick={() => navigate("/register")} className="welcome-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Welcome;
