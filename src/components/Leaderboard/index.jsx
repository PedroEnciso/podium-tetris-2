import { useEffect } from "react";
import style from "./Leaderboard.module.css";
import { useServer } from "../../hooks/useServer";

const Leaderboard = ({
  restartClick,
  name,
  threshold,
  score,
  isNewHighScore,
}) => {
  const { postRequest: getScoreboard, error, data } = useServer("scoreboard");

  useEffect(() => {
    getScoreboard();
  }, []);

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <p className={style.title}>HIGH SCORES</p>
        {error ? (
          <p className={style.error}>
            There was an error loading the leaderboard.
          </p>
        ) : null}
        <div className={style.score_grid}>
          <div
            className={`${style.subgrid} ${style.top_row} ${style.right_align}`}
          >
            <p className={style.top_row_item}>RANK</p>
            <p className={style.top_row_item}>NAME</p>
            <p className={style.top_row_item}>SCORE</p>
          </div>
          {data && data.length > 0
            ? data.slice(0, threshold).map((leader) => {
                let isPlayerScore = leader.name === name;
                return (
                  <div
                    key={leader.place}
                    className={`${style.subgrid} ${style.right_align} ${
                      isPlayerScore ? `${style.current}` : ""
                    }`}
                  >
                    <p>{leader.place}</p>
                    <p>{leader.name}</p>
                    <p>{leader.score}</p>
                  </div>
                );
              })
            : null}
          {isNewHighScore ? (
            <div
              className={`${style.subgrid} ${style.right_align} ${style.current}`}
            >
              <p></p>
              <p>YOU</p>
              <p>{score}</p>
            </div>
          ) : null}
        </div>
        <div className={style.center}>
          <button
            onClick={restartClick}
            className={`btn blink ${style.btn_shadow}`}
          >
            NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
