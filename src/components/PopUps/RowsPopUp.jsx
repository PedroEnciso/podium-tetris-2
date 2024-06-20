import { useEffect } from "react";
import style from "./PopUps.module.css";

function RowsPopUp({ rows }) {
  let content;
  switch (rows) {
    case 1:
      content = "Nice!";
      break;
    case 2:
      content = "Nice!";
      break;
    case 3:
      content = "Epic!";
      break;
    case 4:
      content = "Stupendous!";
      break;
  }
  return <div className={style.container}>{content}</div>;
}

export default RowsPopUp;
