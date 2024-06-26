import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import style from "./NewHighScore.module.css";

function NewHighScore({ onSubmit, place, userId, score, isLoading, error }) {
  const [name, setName] = useState("");
  const { getPlace } = useGetPlace();

  console.log("place", place);

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
              <p className={style.title}>NEW HIGH SCORE!</p>
              <p className={style.score}>{score}</p>
            </div>
            <div>
              <p className={style.text}>You placed</p>
              <p className={style.place}>{getPlace(place)}</p>
            </div>
            {userId ? (
              <div>
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
                {isLoading ? "SUBMITTING" : "SUBMIT"}
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

const useGetPlace = () => {
  function getPlace(place) {
    const lastDigit = place % 10;

    switch (lastDigit) {
      case 1:
        return `${place}st`;
      case 2:
        return `${place}nd`;
      case 3:
        return `${place}rd`;
      default:
        return `${place}th`;
    }
  }
  return { getPlace };
};

export default NewHighScore;
