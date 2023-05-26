import React, { useState, useEffect } from "react";
import "./Touch.css";

const TouchTyping = () => {
  const [targetChar, setTargetChar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateTargetChar();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  const generateTargetChar = () => {
    const characters = "asdfjkl;";
    const randomIndex1 = Math.floor(Math.random() * characters.length);
    const randomIndex2 = Math.floor(Math.random() * characters.length);
    const char1 = characters[randomIndex1];
    const char2 = characters[randomIndex2];
    const pair = char1 + char2;
    setTargetChar(pair);
  };

  const handleKeyPress = (e) => {
    if (e.key === "space" || e.keyCode === 32) {
      if (targetChar === userInput.trim()) {
        setCorrectCount((prevCount) => prevCount);
        setUserInput("");
        generateTargetChar();
      } else {
        setIncorrectCount((prevCount) => prevCount + 1);
        setUserInput();
        generateTargetChar();
      }
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    if (incorrectCount >= 3) {
      setGameOver(true);
    }
  }, [incorrectCount]);

  const handleRestart = () => {
    setTargetChar("");
    setUserInput("");
    setCorrectCount(0);
    setIncorrectCount(0);
    setTimeElapsed(0);
    setGameOver(false);
    generateTargetChar();
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className=" game">
        {gameOver ? (
          <div className="first">
            <h1>Game Over!</h1>
            <p>Correct Count: {correctCount}</p>
            <p>InCorrect Count: {incorrectCount}</p>
            <p>Time Epasped: {timeElapsed} seconds</p>
            <p>Number of Keys pressed in 5 min:</p>
            <button onClick={handleRestart}> Restart Testing</button>
          </div>
        ) : (
          <div className="second">
            <h1>
              Type The Characters: <br />
              <span style={{ color: "blue" }}>{targetChar}</span>
            </h1>
            <input
              type="text"
              placeholder="start your typing test ........."
              value={userInput}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
            />

            <p>Correct Count: {correctCount}</p>
            <p>InCorrect Count: {incorrectCount}</p>
            <p>Time Elasped: {timeElapsed} Seconds</p>

            <p style={{ color: "red", fontSize: "25px" }}>
              {" "}
              Note:Press the space bar to proceed in the game
            </p>
            <p style={{ color: "red", fontSize: "20px" }}>
              If you pressed three times incorrect word the typing test is over{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouchTyping;
