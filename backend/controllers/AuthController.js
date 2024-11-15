// backend/controllers/AuthController.js
import User from "../models/Users.js";
import jwt from "jsonwebtoken";

// Register User (no changes here)
export const registerUser = async (req, res) => {
  // Existing logic
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("authToken").json({ message: "Logout successful" });
};

// Get User Profile (no changes needed)
export const getUserProfile = async (req, res) => {
  // Existing logic
};
