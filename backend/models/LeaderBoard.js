// backend/models/Leaderboard.js
import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  highScore: { type: Number, required: true },
});

export default mongoose.model("Leaderboard", leaderboardSchema);