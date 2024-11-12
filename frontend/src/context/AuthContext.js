//frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    return storedAuth ? storedAuth : { isAuthenticated: false, user: null, token: null };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.isAuthenticated && auth.token) {
        try {
          const response = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: response.data,
          }));
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setAuth({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem("auth");
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [auth.isAuthenticated, auth.token]);

  const login = (userData, token) => {
    console.log("Login payload (no password):", userData); // Ensure password is not included
    setAuth({ isAuthenticated: true, user: userData, token });
  };
  
  
  

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};