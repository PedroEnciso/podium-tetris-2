import React, { useRef } from "react";
import { createPortal } from "react-dom";
import style from "./NewHighScore.module.css";

function NewHighScore({ onSubmit, place = "4th" }) {
  const name = useRef();

  function submit(e) {
    e.preventDefault();
    // http request to submit highscore
    console.log("submit");
    onSubmit();
  }

  return (
    <>
      {createPortal(
        <div className={style.container}>
          <form onSubmit={submit} className={style.form}>
            <p className={style.title}>NEW HIGH SCORE!</p>
            <p className={style.place}>{place}</p>
            <input
              type="text"
              ref={name}
              className={style.input}
              maxLength="4"
            />
            <button className="btn blink">Submit</button>
          </form>
        </div>,
        document.body
      )}
    </>
  );
}

export default NewHighScore;
