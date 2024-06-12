import React from "react";
import style from "./StartGame.module.css";

const StartPage = ({ startClick }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        PODIUM
        <br />
        STACKS
      </h1>
      <button className={style.button} onClick={startClick}>
        START GAME
      </button>
      <p className={style.copywrite}>CabCob © 1982</p>
    </div>
  );
};
export default StartPage;
