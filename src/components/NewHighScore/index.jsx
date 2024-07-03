import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import style from "./NewHighScore.module.css";

function NewHighScore({
  onSubmit,
  userId,
  score,
  isLoading,
  error,
  playerName,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (playerName) {
      setName(playerName);
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    onSubmit(name);
  }

  function handleNameChange(e) {
    setName(e.target.value.toUpperCase());
  }

  // true if isLoading is true, or if nameinput length is not 4 chars long
  const isDisabled = isLoading || name.length !== 4;

  return (
    <>
      {createPortal(
        <div className={style.container}>
          <form onSubmit={submit} className={style.form}>
            <div>
              <p className={style.title}>YOUR SCORE</p>
              <p className={style.score}>{score}</p>
            </div>
            {userId ? (
              <div className={style.input_container}>
                <input
                  onChange={handleNameChange}
                  type="text"
                  value={name}
                  className={style.input}
                  maxLength="4"
                />
                {!error ? (
                  <p className={`${style.text} ${style.mt}`}>Enter your name</p>
                ) : (
                  <p className={`${style.text} ${style.mt} ${style.error}`}>
                    {error}
                  </p>
                )}
              </div>
            ) : null}
            {userId ? (
              <button
                disabled={isDisabled}
                className={`${style.btn_shadow} btn blink`}
              >
                {isLoading ? "SUBMITTING" : "SUBMIT SCORE"}
              </button>
            ) : (
              <LoginForm onSubmit={onSubmit} />
            )}
          </form>
        </div>,
        document.body
      )}
    </>
  );
}

export default NewHighScore;
