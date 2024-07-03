import React from "react";
import "./styles.css";

import { GameModeProvider } from "./context/game-mode-context";
import { UserContextProvider } from "./context/user-context";
import Tetris from "./components/Tetris";

export default function App() {
  return (
    <UserContextProvider>
      <GameModeProvider>
        <Tetris />
      </GameModeProvider>
    </UserContextProvider>
  );
}
