import React from "react";
import { createPortal } from "react-dom";
import RowsPopUp from "../components/PopUps/RowsPopUp";

const PopUpContext = React.createContext();

export function PopUpContextProvider({ children }) {
  const [rows, setRows] = React.useState(0);
  // messi
  const [athlete, setAthlete] = React.useState(null);

  function handlePopUpRows(rows) {
    setRows(rows);
    setTimeout(() => setRows(0), 1000);
  }

  function handlePopUpScore(score) {
    console.log(`Youre at level ${level}`);
  }

  const value = { handlePopUpRows };

  return (
    <>
      {createPortal(
        <>{rows > 0 ? <RowsPopUp rows={rows} /> : null}</>,
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
