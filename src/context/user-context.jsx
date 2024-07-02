import React from "react";
import { useServer } from "../hooks/useServer";

const UserContext = React.createContext();

const USERS = [1234, 5678, 9123, 4567];

export function UserContextProvider({ children }) {
  const [userId, setUserId] = React.useState(null);
  const {
    postRequest: getGameId,
    data: gameId,
    error: errorGameId,
    isLoading: isLoadingGameId,
    resetData: resetGameId,
  } = useServer("startGame");

  React.useEffect(() => {
    // get user on load
    const user = USERS[Math.floor(Math.random() * 4)];
    console.log("user id", user);
    setUserId(user);
    // fetch the game id
    getGameId();
  }, []);

  function getNewGameId() {
    resetGameId();
    getGameId();
  }
  // log error
  if (errorGameId) {
    console.log("error", errorGameId);
  }

  const value = { userId, gameId, getNewGameId, errorGameId };

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
