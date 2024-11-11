/*import fetch from "node-fetch";
import Score from "../models/Score.js";

export const getGameData = async (req, res) => {
  const apiUrl = process.env.BANANA_API_URL;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return res
        .status(response.status)
        .json({ message: "Failed to fetch game data from external API" });
    }

    const base64Data = await response.text();
    res.status(200).json({ imageBase64: base64Data });
  } catch (error) {
    console.error("Error in getGameData:", error);
    res
      .status(500)
      .json({ message: "Internal server error fetching game data" });
  }
};

export const submitScore = async (req, res) => {
  const { userId } = req.user;
  const { score } = req.body;
  try {
    const newScore = new Score({ user: userId, score });
    await newScore.save();
    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ message: "Failed to submit score" });
  }
};

export const getLeaderboard = async (req, res) => {}*/

// backend/controllers/GameController.js
import Score from "../models/Score.js";
import eventBus from "../utils/EventBus.js";
import Leaderboard from "../models/Leaderboard.js"; 

export const submitScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;

  try {
    const newScore = new Score({ user: userId, score });
    await newScore.save();

    eventBus.emit("NEW_SCORE", { userId, score }); // Update leaderboard
    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit score", error });
  }
};

// Event Listener
eventBus.on("NEW_SCORE", async ({ userId, score }) => {
  try {
    const leaderboardEntry = await Leaderboard.findOne({ user: userId });
    if (!leaderboardEntry || score > leaderboardEntry.highScore) {
      await Leaderboard.updateOne(
        { user: userId },
        { user: userId, highScore: score },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
});

export const getGameData = async (req, res) => {
  try {
    const data = await fetch(process.env.BANANA_API_URL);
    if (!data.ok) {
      return res.status(data.status).json({ message: "Failed to fetch game data" });
    }
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching game data", error });
  }
};
