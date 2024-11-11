import User from "../models/Users.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, age, username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ name, email, age, username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
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

    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

// backend/controllers/AuthController.js
/*import User from "../models/Users.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateVirtualIdentity = () => crypto.randomBytes(16).toString("hex");

export const registerUser = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const virtualIdentity = generateVirtualIdentity(); // Generate virtual identity
    const newUser = new User({ name, email, username, password, age });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error:error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error); // Log full error details
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};*/










