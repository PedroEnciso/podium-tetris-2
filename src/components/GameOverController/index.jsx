import React, { useEffect, useState } from "react";
import GameOver from "../GameOver";
import Leaderboard from "../Leaderboard";
import NewHighScore from "../NewHighScore";
import { useUserContext } from "../../context/user-context";

function GameOverController({ restartClick, status }) {
  // can be 'game over' | 'new high score' | 'leaderboard'
  const [currentScreen, setCurrentScreen] = useState("game over");
  // const { data, error, fetchPlace } = useFetch();
  const { user } = useUserContext();

  function showLeaderboard() {
    setCurrentScreen("leaderboard");
  }

  if (currentScreen === "game over") {
    // fetchPlace() to check if score is a new high score
    setTimeout(() => {
      setCurrentScreen("new high score");
    }, 2000);
    return <GameOver />;
  }

  if (currentScreen === "new high score") {
    console.log("new high score");
    return <NewHighScore onSubmit={showLeaderboard} user={user} />;
  }

  if (currentScreen === "leaderboard") {
    return <Leaderboard restartClick={restartClick} status={status} />;
  }

  return null;
}

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPlace() {
    try {
      const response = await fetch("url");

      if (!response.ok) {
        throw new Error("there was an issue");
      }

      setData(await response.json());
    } catch (error) {
      setError(error.message);
    }
  }

  return { data, error, fetchPlace };
};

const useFetchWithTimeout = () => {
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchWithTimeout(url, timeout) {
    // Create a timeout promise that resolves after the specified time
    const timeoutPromise = delay(timeout).then(() => {
      throw new Error("Request timed out");
    });

    // Fetch the URL and race it against the timeout
    const fetchPromise = fetch(url);

    // Return a promise that resolves with the longer of the two
    return Promise.race([timeoutPromise, fetchPromise])
      .then((response) => {
        if (response instanceof Response) {
          return response.json(); // or response.text() if you prefer
        } else {
          return response;
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  return { fetchWithTimeout };
};

export default GameOverController;
