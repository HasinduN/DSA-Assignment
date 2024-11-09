// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // Redirect to login if the user is not authenticated
  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

