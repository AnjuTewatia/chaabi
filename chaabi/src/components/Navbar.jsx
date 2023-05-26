import React from "react";

const Navbar = () => {
  return (
    <div
      className="Navbar"
      style={{
        display: "flex",
        backgroundColor: "brown",
        width: "100%",
        gap: "60%",
      }}
    >
      <h1 style={{ marginLeft: "40px" }}>Chaabi Assignment </h1>
      <h1>Touch Typing</h1>
    </div>
  );
};

export default Navbar;
