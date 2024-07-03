import React, { useEffect, useState } from "react";
import GameOver from "../GameOver";
import Leaderboard from "../Leaderboard";
import NewHighScore from "../NewHighScore";
import { useUserContext } from "../../context/user-context";
import { useServer } from "../../hooks/useServer";

function GameOverController({ restartClick, status }) {
  const { userId, gameId, savePlayerNameToLocalStorage, playerName } =
    useUserContext();
  // score | leaderboard
  const [screen, setScreen] = useState("score");
  const LEADERBOARD_THRESHOLD = 5;

  if (!gameId) {
    return (
      <Leaderboard
        restartClick={restartClick}
        threshold={LEADERBOARD_THRESHOLD}
        score={status.score}
      />
    );
  }

  const {
    postRequest: submitHighScore,
    error: errorHighScore,
    data: dataHighScore,
    isLoading: isLoadingHighScore,
  } = useServer("highScore");

  function postHighScore(name) {
    // submit the user's high score
    submitHighScore({ gameId, name, score: status.score, CustomerId: userId });
    savePlayerNameToLocalStorage(name);
  }

  if (!dataHighScore || errorHighScore || isLoadingHighScore) {
    return (
      <NewHighScore
        onSubmit={postHighScore}
        userId={userId}
        score={status.score}
        isLoading={isLoadingHighScore}
        error={errorHighScore}
        playerName={playerName}
      />
    );
  }

  if (dataHighScore) {
    return (
      <Leaderboard
        restartClick={restartClick}
        name={dataHighScore.name}
        threshold={LEADERBOARD_THRESHOLD}
        score={status.score}
        isNewHighScore={dataHighScore.newHighScore}
      />
    );
  }

  return null;
}

export default GameOverController;
