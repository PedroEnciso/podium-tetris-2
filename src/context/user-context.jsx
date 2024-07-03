import React from "react";
import { useServer } from "../hooks/useServer";

const UserContext = React.createContext();

const USERS = [1234, 5678, 9123, 4567];

export function UserContextProvider({ children }) {
  const [userId, setUserId] = React.useState(null);
  const [playerName, setPlayerName] = React.useState(null);
  const {
    postRequest: getGameId,
    data: gameId,
    error: errorGameId,
    isLoading: isLoadingGameId,
    resetData: resetGameId,
  } = useServer("startGame");

  // localStorage functions for player name
  function getPlayerNameFromLocalStorage() {
    return localStorage.getItem("playerName");
  }

  function savePlayerNameToLocalStorage(name) {
    localStorage.setItem("playerName", name);
  }

  React.useEffect(() => {
    // get user on load
    const user = USERS[Math.floor(Math.random() * 4)];
    setUserId(1324232);
    // fetch the game id
    getGameId();
    // set the player name
    setPlayerName(getPlayerNameFromLocalStorage());
  }, []);

  function getNewGameId() {
    resetGameId();
    getGameId();
  }

  const value = {
    userId,
    gameId,
    getNewGameId,
    errorGameId,
    savePlayerNameToLocalStorage,
    playerName,
  };

  return (
    <UserContext.Provider value={value}>
      {!isLoadingGameId ? children : null}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
