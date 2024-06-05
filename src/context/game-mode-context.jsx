import React from "react";

const GameModeContext = React.createContext();

export function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = React.useState("original");

  function setOriginalMode() {
    setGameMode("original");
  }

  function setInvertedMode() {
    setGameMode("inverted");
  }

  function getGameModes() {
    return [
      { mode: "original", setter: setOriginalMode },
      { mode: "inverted", setter: setInvertedMode },
    ];
  }

  const value = { gameMode, setOriginalMode, setInvertedMode, getGameModes };

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
