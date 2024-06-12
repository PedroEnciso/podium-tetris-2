import React from "react";
import style from "./LoseGame.module.css";

const LoseGame = ({ status, portrait, pixelSize, theme3d, restartClick }) => {
  const DUMMY_DATA = [
    {
      id: "1",
      rank: "1st",
      name: "Paul",
      score: 100000,
      isCurrentPlayer: false,
    },
    {
      id: "2",
      rank: "2nd",
      name: "Jeff",
      score: 90000,
      isCurrentPlayer: false,
    },
    {
      id: "3",
      rank: "3rd",
      name: "Leo",
      score: 80000,
      isCurrentPlayer: false,
    },
    {
      id: "4",
      rank: "4th",
      name: "Jess",
      score: 50000,
      isCurrentPlayer: false,
    },
    {
      id: "5",
      rank: "5th",
      name: "Dylan",
      score: 1,
      isCurrentPlayer: false,
    },
    {
      id: "6",
      rank: "",
      name: "You",
      score: status.score,
      isCurrentPlayer: true,
    },
  ];

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <p className={style.title}>HIGH SCORES</p>
        <div className={style.score_grid}>
          <div
            className={`${style.subgrid} ${style.top_row} ${style.right_align}`}
          >
            <p className={style.top_row_item}>RANK</p>
            <p className={style.top_row_item}>NAME</p>
            <p className={style.top_row_item}>SCORE</p>
          </div>
          {DUMMY_DATA.map((score) => (
            <div
              key={score.id}
              className={`${style.subgrid} ${style.right_align} ${
                score.isCurrentPlayer ? `${style.current} blink` : ""
              }`}
            >
              <p>{score.rank}</p>
              <p>{score.name}</p>
              <p>{score.score}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={restartClick}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default LoseGame;
