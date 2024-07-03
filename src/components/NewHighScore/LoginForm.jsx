import React from "react";
import style from "./NewHighScore.module.css";

function LoginForm({ onSubmit }) {
  return (
    <div>
      <p className={style.text}>SIGN UP FOR PODIUM TO SAVE YOUR SCORE</p>
      <button onClick={onSubmit}>CONTINUE WITHOUT SAVING</button>
    </div>
  );
}

export default LoginForm;
