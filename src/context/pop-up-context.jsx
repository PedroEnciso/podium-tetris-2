import React from "react";
import { createPortal } from "react-dom";
import RowsPopUp from "../components/PopUps/RowsPopUp";
import AthletePopUp from "../components/PopUps/AthletePopUp";

const PopUpContext = React.createContext();

export function PopUpContextProvider({ children }) {
  const [rows, setRows] = React.useState(0);
  // messi
  const [athlete, setAthlete] = React.useState(null);

  function handlePopUpRows(rows) {
    setRows(rows);
    setTimeout(() => setRows(0), 2000);
  }

  function handlePopUpScore(prevScore, score) {
    if (score >= 6000 && score < 6400) {
      setAthlete("messi");
      setTimeout(() => setAthlete(null), 2000);
    } else if (score >= 6400 && prevScore < 6000) {
      setAthlete("messi");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 12000 && score < 12400) {
      setAthlete("ronaldo");
      setTimeout(() => setAthlete(null), 2000);
    } else if (score >= 12400 && prevScore < 12000) {
      setAthlete("ronaldo");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score === -1) {
      setAthlete("cheat");
      setTimeout(() => setAthlete(null), 2000);
    }
  }

  const value = { handlePopUpRows, handlePopUpScore };

  return (
    <>
      {createPortal(
        <>{rows > 0 ? <RowsPopUp rows={rows} /> : null}</>,
        document.getElementById("pop-up")
      )}
      {createPortal(
        <>{athlete ? <AthletePopUp athlete={athlete} /> : null}</>,
        document.getElementById("pop-up")
      )}
      <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>
    </>
  );
}

export function usePopUpContext() {
  const context = React.useContext(PopUpContext);
  if (context === undefined) {
    throw new Error(
      "usePopUpContext must be used within a PopUpContextProvider"
    );
  }
  return context;
}
