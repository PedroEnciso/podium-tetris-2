import React from "react";
import { createPortal } from "react-dom";
import RowsPopUp from "../components/PopUps/RowsPopUp";
import AthletePopUp from "../components/PopUps/AthletePopUp";

const PopUpContext = React.createContext();

export function PopUpContextProvider({ children }) {
  const [rows, setRows] = React.useState(0);
  const [athlete, setAthlete] = React.useState(null);

  function handlePopUpRows(rows) {
    setRows(rows);
    setTimeout(() => setRows(0), 2000);
  }

  function handlePopUpScore(prevScore, score) {
    if (score >= 5000 && prevScore < 5000) {
      setAthlete("brooke");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 15000 && prevScore < 15000) {
      setAthlete("craig");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 50000 && prevScore < 50000) {
      setAthlete("emma");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 75000 && prevScore < 75000) {
      setAthlete("heber");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 100000 && prevScore < 100000) {
      setAthlete("justin");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 200000 && prevScore < 200000) {
      setAthlete("kels");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 300000 && prevScore < 300000) {
      setAthlete("mars");
      setTimeout(() => setAthlete(null), 2000);
    }

    if (score >= 400000 && prevScore < 400000) {
      setAthlete("mat");
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
