// backend/controllers/LeaderboardController.js
import Score from "../models/Score.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$user", // Group by user ID
          highScore: { $max: "$score" }, // Get the highest score for each user
        },
      },
      {
        $lookup: {
          from: "users", // Reference the 'users' collection
          localField: "_id", // Match _id from Score group with _id in User
          foreignField: "_id",
          as: "userDetails", // Alias for user data
        },
      },
      {
        $unwind: "$userDetails", // Unwind the user details object
      },
      {
        $project: {
          _id: 0, // Exclude MongoDB _id
          username: "$userDetails.username", // Include username
          name: "$userDetails.name", // Include user name
          highScore: 1, // Include high score
        },
      },
      {
        $sort: { highScore: -1 }, // Sort by high score descending
      },
      {
        $limit: 10, // Top 10 players
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leaderboard", error: error.message });
  }
};