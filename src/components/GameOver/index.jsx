import React from "react";
import { createPortal } from "react-dom";

import style from "./GameOver.module.css";

function GameOver(props) {
  return (
    <>
      {createPortal(
        <div className={style.container}>
          <p className={style.text}>
            GAME
            <br />
            OVER
          </p>
        </div>,
        document.getElementById("stage")
      )}
    </>
  );
}

export default GameOver;
