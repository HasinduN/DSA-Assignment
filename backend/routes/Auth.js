import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/AuthController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getUserProfile); // Protected route

export default router;



