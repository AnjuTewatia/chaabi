import React, { useState, useEffect } from "react";
import "./Touch.css";

const TouchTyping = () => {
  const [targetChar, setTargetChar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentstr, setCurrentstr] = useState("");
  const [timer, settimer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [total, setTotal] = useState(0);
  const [accuracy, setaccuracy] = useState(0);

  useEffect(() => {
    generateTargetChar();
  }, []);
  useEffect(() => {
    const gameOver = setTimeout(() => {
      setGameOver(true);
    }, 60000);
    return () => clearTimeout(gameOver);
  }, [gameOver]);

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
    if (e.key === "Space" || e.keyCode === 32) {
      if (targetChar === userInput.trim()) {
        setCorrectCount((prevCount) => prevCount + 1);
        setUserInput("");
        generateTargetChar();
      } else {
        setIncorrectCount((prevCount) => prevCount + 1);
        setUserInput("");
        generateTargetChar();
      }
    }
  };
  // input text field
  const handleInputChange = (e) => {
    setUserInput(e.target.value);

    setTotal(total + 1);
    let v = e.target.value;
    setUserInput(e.target.value);

    settimer(true);
    let count = 1;

    for (let i = 0; i < v.length; i++) {
      if (v[i] === currentstr[i]) {
        setCorrect(count++);
      } else {
        setWrong(wrong + 1);
      }
    }

    if (e.target.value === currentstr) {
      setTimeout(() => {
        setUserInput("");
      }, 1500);
    }
    console.log(accuracy);
  };

  useEffect(() => {
    if (incorrectCount >= 3) {
      setGameOver(true);
    }
  }, [incorrectCount]);

  const handleRestart = () => {
    setTotal(0);
    setTargetChar("");
    setUserInput("");
    setCorrectCount(0);
    setIncorrectCount(0);
    setTimeElapsed(0);
    setGameOver(false);
    generateTargetChar();
  };
  //  to count accuracy
  const accuracyCount = () => {
    let total = correctCount + incorrectCount;
    let ac = (correctCount / total) * 100;
    setaccuracy(ac.toFixed(2));
  };
  useEffect(() => {
    accuracyCount();
  }, [gameOver]);

  return (
    <div>
      <div className=" game">
        {gameOver ? (
          <div
            className="back"
            style={{
              width: "100%",

              height: "380px",
              paddingTop: "20px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCPkQ6vjaXugxgS0Jg_utkvqwNIRoCkkQfA&usqp=CAU" )`,
            }}
          >
            <div className="first">
              <h1> You Lost the Test</h1>
              <p>Correct Count: {correctCount}</p>
              <p>InCorrect Count: {incorrectCount}</p>
              <p>Time Epasped: {timeElapsed} seconds</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  justifyItems: "center",
                }}
              >
                <h4> Total: {total} </h4>
                <h4> Accuracy: {accuracy}% </h4>
                <h4> WPM: {correctCount} </h4>
              </div>{" "}
              <button onClick={handleRestart}> Restart Testing</button>
            </div>
          </div>
        ) : (
          <div className="second">
            <div
              className="back"
              style={{
                width: "100%",
                height: "420px",
                paddingTop: "20px",
                borderRadius: "5",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKn7qNdNNiu_VvQb7kmo4LAh5eENezbJ0dA&usqp=CAU" )`,
              }}
            >
              <h1>
                Type The Characters:
                <br />
                <span style={{ color: "blue" }}>{targetChar}</span>
              </h1>
              <input
                type="text"
                placeholder="start your typing test ........."
                value={userInput}
                autoComplete="off"
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
                If you pressed three times incorrect word the typing test is
                over{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouchTyping;
