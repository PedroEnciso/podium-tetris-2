import React from "react";

const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // get user on load
    // setUser("1234");
  }, []);

  const value = { user };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
