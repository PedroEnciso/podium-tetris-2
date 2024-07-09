import React from "react";
import { createPortal } from "react-dom";
import RowsPopUp from "../components/PopUps/RowsPopUp";
import AthletePopUp from "../components/PopUps/AthletePopUp";
import { ATHLETES } from "../constants";

const PopUpContext = React.createContext();

export function PopUpContextProvider({ children }) {
  const [rows, setRows] = React.useState(0);
  const [athlete, setAthlete] = React.useState(null);
  const [threshold, setThreshold] = React.useState(1000);

  function handlePopUpRows(rows) {
    setRows(rows);
    setTimeout(() => setRows(0), 2000);
  }

  function handlePopUpScore(prevScore, score) {
    if (score === -1) {
      setAthlete("cheat");
      setTimeout(() => setAthlete(null), 2000);
      return;
    }

    if (score >= threshold && prevScore < threshold) {
      console.log("setting athlete!");
      setThreshold((prev) => prev * 2);
      const randomIndex = Math.floor(Math.random() * 8);
      setAthlete(ATHLETES[randomIndex]);
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
