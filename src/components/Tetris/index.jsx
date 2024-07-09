import React, { useState } from "react";

import StartPage from "../StartPage";
import Game from "../Game";
import { PopUpContextProvider } from "../../context/pop-up-context";
import { CheatConsoleProvider } from "../../context/cheat-console";

const Tetris = () => {
  const [runing, setRuning] = useState(false);
  return runing ? (
    <PopUpContextProvider>
      <CheatConsoleProvider exitConsole={() => {}}>
        <Game stopClick={() => setRuning(false)} />
      </CheatConsoleProvider>
    </PopUpContextProvider>
  ) : (
    <StartPage startClick={() => setRuning(true)} />
  );
};

export default Tetris;
