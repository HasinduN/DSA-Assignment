// backend/Server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db.js";

import gameRoutes from "./routes/Game.js";
import authRoutes from "./routes/Auth.js";
import leaderboardRoutes from "./routes/LeaderBoard.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable credentials for CORS
app.use(cookieParser()); // Use cookie-parser

connectDB();

// Routes
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
