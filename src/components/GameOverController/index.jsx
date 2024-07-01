import React, { useEffect, useState } from "react";
import GameOver from "../GameOver";
import Leaderboard from "../Leaderboard";
import NewHighScore from "../NewHighScore";
import { useUserContext } from "../../context/user-context";
import { useServer } from "../../hooks/useServer";

function GameOverController({ restartClick, status }) {
  const { userId, gameId } = useUserContext();
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
    postRequest: submitGameOver,
    error: errorGameOver,
    data: dataGameOver,
    isLoading: isLoadingGameOver,
  } = useServer("gameOver");
  const {
    postRequest: submitHighScore,
    error: errorHighScore,
    data: dataHighScore,
    isLoading: isLoadingHighScore,
  } = useServer("highScore");

  function postHighScore(name) {
    // submit the user's high score
    console.log(`submitting score of ${status.score} for ${name}`);
    // change the screen to display the leaderboard
    submitHighScore({ gameId, name, score: status.score, CustomerId: userId });
  }

  useEffect(() => {
    // submit player scores if id exists
    if (gameId) {
      submitGameOver({ gameId });
    }
  }, []);

  // show GameOver scenarios
  if (isLoadingGameOver) {
    return <GameOver />;
  }

  //show leaderboard scenarios
  if (dataHighScore) {
    return (
      <Leaderboard
        restartClick={restartClick}
        rank={dataGameOver}
        threshold={LEADERBOARD_THRESHOLD}
        score={status.score}
      />
    );
  }

  if ((dataGameOver && dataGameOver > LEADERBOARD_THRESHOLD) || errorGameOver) {
    return (
      <Leaderboard
        restartClick={restartClick}
        rank={dataGameOver}
        threshold={LEADERBOARD_THRESHOLD}
        score={status.score}
      />
    );
  }

  // show NewHighScore scenarios
  if (dataGameOver && dataGameOver <= LEADERBOARD_THRESHOLD) {
    console.log("new high score", dataGameOver);
    return (
      <NewHighScore
        onSubmit={postHighScore}
        userId={userId}
        score={status.score}
        place={dataGameOver}
        isLoading={isLoadingHighScore}
        error={errorHighScore}
      />
    );
  }

  return null;
}

export default GameOverController;
