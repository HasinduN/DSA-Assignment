import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { auth, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found, please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data); // Set the profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.response?.data?.message || "Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="profile-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
      <h2 className="profile-title">User Profile</h2>
      {profile ? (
        <>
          <div className="profile-field">
            <span className="profile-label">Name:</span> {profile.name}
          </div>
          <div className="profile-field">
            <span className="profile-label">Email:</span> {profile.email}
          </div>
          <div className="profile-field">
            <span className="profile-label">Age:</span> {profile.age}
          </div>
          <div className="profile-field">
            <span className="profile-label">Username:</span> {profile.username}
          </div>
        </>
      ) : (
        <p>Loading profile details...</p>
      )}
    </div>
    </div>
  );
};

export default Profile;
