import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import style from "./NewHighScore.module.css";

function NewHighScore({ onSubmit, place = "4th", user }) {
  const [name, setName] = useState("");
  const { data, error, isLoading, submitHighScore } = usePostRequest();

  function submit(e) {
    e.preventDefault();

    // submitHighScore(place, score, name)
    onSubmit();
  }

  function handleNameChange(e) {
    setName(e.target.value);
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
              <p className={style.score}>100000</p>
            </div>
            <div>
              <p className={style.text}>You placed</p>
              <p className={style.place}>{place}</p>
            </div>
            {user ? (
              <div>
                <input
                  onChange={handleNameChange}
                  type="text"
                  value={name}
                  className={style.input}
                  maxLength="4"
                />
                <p className={`${style.text} ${style.mt}`}>Enter your name</p>
              </div>
            ) : null}
            {user ? (
              <button
                disabled={isDisabled}
                className={`${style.btn_shadow} btn blink`}
              >
                SUBMIT
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

const usePostRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function submitHighScore() {
    setIsLoading(true);
    try {
      ///// CHANGE URL
      const response = await fetch("url");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setData(await response.json());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return { data, error, isLoading, submitHighScore };
};

export default NewHighScore;
