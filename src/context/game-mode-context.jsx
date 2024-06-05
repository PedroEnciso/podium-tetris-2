import React from "react";

const GameModeContext = React.createContext();

export function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = React.useState("original");

  function setMode(mode) {
    setGameMode(mode);
  }

  function getGameModes() {
    return [
      { mode: "original", setter: setMode.bind(null, "original") },
      { mode: "inverted", setter: setMode.bind(null, "inverted") },
      { mode: "suprise block", setter: setMode.bind(null, "suprise block") },
    ];
  }

  const value = { gameMode, getGameModes };

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
