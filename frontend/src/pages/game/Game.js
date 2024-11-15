//frontend/src/pages/game/Game.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const Game = () => {
  const [questionImage, setQuestionImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const navigate = useNavigate();

  // Fetch a new question
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setQuestionImage(response.data.question);
      setSolution(response.data.solution);
      setFeedback("");
      setUserAnswer("");
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Handle game exit and submit score
  const endGame = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/game/submit-score",
        { score },
        {
          withCredentials: true, // Send cookies with the request
        }
      );
      alert(`Game Over! Your final score: ${score}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  // Automatically end game when lives are zero
  useEffect(() => {
    if (lives === 0) {
      endGame();
    }
  }, [lives, endGame]);

  // Handle answer submission
  const submitAnswer = () => {
    const parsedAnswer = parseInt(userAnswer, 10);

    if (parsedAnswer === solution) {
      setFeedback("YES YOU ARE CORRECT!");
      setScore((prevScore) => prevScore + 10);
      setTimeout(() => {
        fetchQuestion(); // Fetch a new question
      }, 2000);
    } else {
      setFeedback("NO! Try again!");
      setLives((prevLives) => prevLives - 1);
    }

    setUserAnswer("");
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="game-container">
      <h2 className="game-title animated-title">BRAIN BANANA</h2>
      
      <div className="lives-container">
        {[...Array(lives)].map((_, index) => (
          <span
            key={index}
            className="heart yellow-heart"
          ></span>
        ))}
      </div>
      
      <p className="score-text">POINTS: {score}</p>
      
      {questionImage ? (
        <img src={questionImage} alt="Question" className="question-image" />
      ) : (
        <p>Loading the game...</p>
      )}

      <input
        type="text"
        placeholder="Enter your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="answer-input"
      />

      <button onClick={submitAnswer} className="submit-button">
        CORRECT?
      </button>

      <button onClick={endGame} className="exit-button">
        Exit
      </button>

      {feedback && (
        <p
          className={`feedback-text ${
            feedback === "YES YOU ARE CORRECT!" ? "feedback-correct" : "feedback-incorrect"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Game;