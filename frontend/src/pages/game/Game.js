import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [questionImage, setQuestionImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setQuestionImage(response.data.question);
      setSolution(response.data.solution);
      setFeedback("");
      setUserAnswer(""); // Clear previous answer for new question
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const submitAnswer = () => {
    const parsedUserAnswer = parseInt(userAnswer, 10);
    console.log("User Answer:", parsedUserAnswer, "Solution:", solution);

    if (parsedUserAnswer === solution) {
      setFeedback("YES YOU ARE CORRECT !");
      setTimeout(() => {
        fetchQuestion(); // Fetch a new question if correct
      }, 2000);
    } else {
      setFeedback("NO! Try again !");
    }

    setUserAnswer(""); // Clear the input field on each attempt
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="game-container">
      <h2>BRAIN BANANA</h2>
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
        CORRECT ?
      </button>
      {feedback && (
        <p className={`feedback-text ${feedback === "YES YOU ARE CORRECT !" ? "feedback-correct" : "feedback-incorrect"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Game;



