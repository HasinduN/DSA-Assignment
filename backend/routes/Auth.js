// backend/routes/Auth.js
import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controllers/AuthController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateToken, getUserProfile);

export default router;
