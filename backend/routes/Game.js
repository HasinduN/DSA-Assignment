//backend/routes/Game.js
import express from "express";
import {
  getGameData,
  submitScore,
  //getLeaderboard,
} from "../controllers/GameController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

//router.get("/banana-data", getGameData);
router.post("/submit-score", authenticateToken, submitScore);

export default router;