import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { auth, loading } = useContext(AuthContext);

  useEffect(() => {
    console.log("Auth state in profile:", auth);
  }, [auth]);

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  if (!auth.isAuthenticated) {
    return <div className="profile-container"><p>Please log in to view your profile.</p></div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {auth.user ? (
        <>
          <p><strong>Name:</strong> {auth.user.name}</p>
          <p><strong>Email:</strong> {auth.user.email}</p>
          <p><strong>Age:</strong> {auth.user.age}</p>
          <p><strong>Username:</strong> {auth.user.username}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;





