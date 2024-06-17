import React, { useRef } from "react";
import { createPortal } from "react-dom";
import style from "./NewHighScore.module.css";

function NewHighScore({ onSubmit, place = "4th" }) {
  const name = useRef();
  // const {data, error, isLoading, submitHighScore} = usePostRequest();

  function submit(e) {
    e.preventDefault();

    // submitHighScore(place, score, name)
    onSubmit();
  }

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
            <div>
              <input
                type="text"
                ref={name}
                className={style.input}
                maxLength="4"
              />
              <p className={`${style.text} ${style.mt}`}>Enter your name</p>
            </div>
            <button className={`${style.btn_shadow} btn blink`}>SUBMIT</button>
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
