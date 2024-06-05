import React from "react";
import "./styles.css";

import { GameModeProvider } from "./context/game-mode-context";
import Tetris from "./components/Tetris";

export default function App() {
  return (
    <GameModeProvider>
      <Tetris />
    </GameModeProvider>
  );
}
