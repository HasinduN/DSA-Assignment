//frontend/src/pages/register/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        age,
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="register-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="register-input"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;