import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
} from "react";
import { ATHLETES } from "../constants";

const CheatConsoleContext = createContext();

export function CheatConsoleProvider({ children, exitConsole }) {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [activeCheat, setActiveCheat] = useState("");
  const inputRef = useRef(null);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "`") {
        setConsoleOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (consoleOpen) {
      setTimeout(() => inputRef.current.focus(), 1);
    } else {
      exitConsole();
    }
  }, [consoleOpen]);

  function onSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value.toLowerCase();
    setConsoleOpen(false);

    if (ATHLETES.find((a) => a === value)) {
      setActiveCheat(value);
    }
  }

  const value = {
    activeCheat,
  };

  return (
    <CheatConsoleContext.Provider value={value}>
      {consoleOpen && (
        <form
          onSubmit={onSubmit}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Super secret cheat codes..."
            style={{
              height: "2rem",
              fontSize: "1.5rem",
              background: "#000",
              color: "#fff",
              border: "2px solid #fff",
              width: "100%",
              padding: "0.5rem",
            }}
          />
        </form>
      )}

      {children}
    </CheatConsoleContext.Provider>
  );
}

export function useCheatConsole() {
  const context = useContext(CheatConsoleContext);
  if (context === undefined) {
    throw new Error(
      "useCheatConsole must be used within a CheatConsoleProvider"
    );
  }
  return context;
}
