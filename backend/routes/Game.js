import express from "express";
import {
  getGameData,
  submitScore,
  getLeaderboard,
} from "../controllers/GameController.js";

const router = express.Router();

router.get("/banana-data", getGameData);
router.post("/submit-score", submitScore);
router.get("/leaderboard", getLeaderboard);

export default router;
