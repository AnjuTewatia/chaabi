import React, { useState } from "react";
import TouchTyping from "./Touchtyping";
import "./Typing.css";

const Typing = () => {
  const [startGame, setStartGame] = useState(false);
  return (
    <div className="main">
      {!startGame && (
        <div
          className="background"
          style={{
            width: "90%",
            margin: "auto",

            backgroundImage: `url("https://i.ytimg.com/vi/2S3lhm8LaZo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgQigzMA8=&rs=AOn4CLAFIGqBWPzLaiYkzh7Mzizo56dDsQ" )`,
          }}
        >
          <button
            className="button"
            style={{ color: "black" }}
            onClick={() => setStartGame(true)}
          >
            {" "}
            Start Touch Typing
          </button>
        </div>
      )}
      <div style={{ width: "100%" }}>
        {startGame && <TouchTyping />}

        {startGame && (
          <button
            style={{
              fontSize: "30px",
              marginBottom: "20px",
              border: "none",
              backgroundColor: "#fff",
            }}
            onClick={() => window.location.reload()}
          >
            Stop Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Typing;
