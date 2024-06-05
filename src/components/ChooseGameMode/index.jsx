import React from "react";
import { useGameMode } from "../../context/game-mode-context";

function ChooseGameMode({ startGame }) {
  const { getGameModes } = useGameMode();

  const modes = getGameModes();

  function start(setter) {
    setter();
    startGame();
  }
  return (
    <React.Fragment>
      <div>
        <p>Choose your game mode</p>
      </div>
      <ul>
        {modes.map((mode) => (
          <li key={mode.mode}>
            <button onClick={() => start(mode.setter)}>{mode.mode}</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default ChooseGameMode;
