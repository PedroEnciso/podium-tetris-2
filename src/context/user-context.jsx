import React from "react";
import { useServer } from "../hooks/useServer";

const UserContext = React.createContext();

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
    setUserId(1234);
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
