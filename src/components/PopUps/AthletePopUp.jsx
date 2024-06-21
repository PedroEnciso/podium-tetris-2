import React from "react";
import messiImage from "../../images/messi.webp";
import ronaldoImage from "../../images/ronaldo.jpeg";
import style from "./PopUps.module.css";

function AthletePopUp({ athlete }) {
  if (athlete === "messi") {
    return (
      <div className={`${style.athlete_container} ${style.container_left}`}>
        <img src={messiImage} />
        <p>Hard work pays off!</p>
      </div>
    );
  }

  if (athlete === "ronaldo") {
    return (
      <div className={`${style.athlete_container} ${style.container_right}`}>
        <img src={ronaldoImage} />
        <p>SUUUIII</p>
      </div>
    );
  }

  if (athlete === "cheat") {
    return (
      <>
        <div className={`${style.athlete_container} ${style.container_left}`}>
          <img src={messiImage} />
          <p>NICE</p>
        </div>
        <div
          className={`${style.athlete_container} ${style.container_top_right}`}
        >
          <img src={ronaldoImage} />
          <p>NICE</p>
        </div>
      </>
    );
  }
}

export default AthletePopUp;
