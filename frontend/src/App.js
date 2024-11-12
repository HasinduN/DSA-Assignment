import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/navBar/NavBar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Game from "./pages/game/Game";
import Profile from "./pages/profile/Profile";
import LeaderBoard from "./pages/leaderBoard/LeaderBoard";
import Welcome from "./pages/welcome/Welcome";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthWrapper>
      </Router>
    </AuthProvider>
  );
}

const AuthWrapper = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticated && <NavBar />} {/* Display NavBar only if authenticated */}
      {children}
    </>
  );
};

export default App;

