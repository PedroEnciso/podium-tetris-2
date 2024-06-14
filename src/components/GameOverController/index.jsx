import React, { useState } from "react";
import GameOver from "../GameOver";
import LoseGame from "../LoseGame";
import NewHighScore from "../NewHighScore";

function GameOverController({ restartClick, status }) {
  // can be 'game over' | 'new high score' | 'leaderboard'
  const [currentScreen, setCurrentScreen] = useState("game over");
  const { fetchWithTimeout } = useFetchWithTimeout();

  function showLeaderboard() {
    setCurrentScreen("leaderboard");
  }

  if (currentScreen === "game over") {
    setTimeout(() => {
      setCurrentScreen("new high score");
    }, 2000);
    return <GameOver />;
  }

  if (currentScreen === "new high score") {
    console.log("new high score");
    return <NewHighScore onSubmit={showLeaderboard} />;
  }

  if (currentScreen === "leaderboard") {
    return <LoseGame restartClick={restartClick} status={status} />;
  }

  return null;
}

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
