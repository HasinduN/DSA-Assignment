import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Db.js";
import gameRoutes from "./routes/Game.js";
import authRoutes from "./routes/Auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); 

// Routes
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

