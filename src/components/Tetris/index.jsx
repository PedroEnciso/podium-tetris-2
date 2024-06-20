import React, { useState } from "react";

import StartPage from "../StartPage";
import Game from "../Game";
import { PopUpContextProvider } from "../../context/pop-up-context";

const Tetris = () => {
  const [runing, setRuning] = useState(false);
  return runing ? (
    <PopUpContextProvider>
      <Game stopClick={() => setRuning(false)} />
    </PopUpContextProvider>
  ) : (
    <StartPage startClick={() => setRuning(true)} />
  );
};

export default Tetris;
