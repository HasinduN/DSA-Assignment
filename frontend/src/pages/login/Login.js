//frontend/src/pages/login/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/ApiService";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ username, password }); // Call the service function
      localStorage.setItem("authToken", data.token); // Save the token in local storage
  
      login({
        isAuthenticated: true,
        user: data.user,
      });
  
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setErrorMessage(error.response.data?.message || "Failed to login. Please try again.");
      } else if (error.request) {
        setErrorMessage("No response from server. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
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
      { errorMessage && <p className="login-error"> {errorMessage} </p>}
      <p className="register-text">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;