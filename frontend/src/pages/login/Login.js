// src/pages/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To display login errors
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      if (response.status === 200) {
        //login(response.data.user);
        //navigate("/dashboard");
        localStorage.setItem("authToken", response.data.token);

        login({
          isAuthenticated: true,
          user: response.data.user,
        });

        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <p className="register-text">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;

