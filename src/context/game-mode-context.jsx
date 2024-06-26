import React from "react";

const GameModeContext = React.createContext();

export function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = React.useState("original");

  console.log("game mode is", gameMode);

  function setRandomMode() {
    const MODES = ["original", "inverted", "surprise block", "random speed"];
    const randomMode = MODES[Math.floor(Math.random() * 4)];
    if (randomMode === gameMode) {
      // if the new mode is equal to current mode, default to original mode
      // this gives the user a break from the dumb game modes
      setGameMode("original");
      return;
    }
    setGameMode(randomMode);
  }

  function resetGameMode() {
    setGameMode("original");
  }

  const value = { gameMode, setRandomMode, resetGameMode };

  return (
    <GameModeContext.Provider value={value}>
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const context = React.useContext(GameModeContext);
  if (context === undefined) {
    throw new Error("useGameMode must be used within a GameModeProvider");
  }
  return context;
}
