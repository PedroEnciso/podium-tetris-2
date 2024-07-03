import { useState } from "react";

export const useServer = (type) => {
  const BASE_URL = "https://321-podium.elevatedloyalty.com/api/public";
  let METHOD = "POST";
  let URL = "";
  switch (type) {
    case "startGame":
      URL = `${BASE_URL}/startGame`;
      break;
    case "update":
      URL = `${BASE_URL}/updateScore`;
      break;
    case "gameOver":
      URL = `${BASE_URL}/checkScoreRank`;
      break;
    case "highScore":
      URL = `${BASE_URL}/saveScoreToLeaderboard`;
      break;
    case "scoreboard":
      URL = `${BASE_URL}/scoreboard`;
      METHOD = "GET";
      break;
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function postRequest(requestBody) {
    setIsLoading(true);
    setError(null);
    const options =
      METHOD === "POST"
        ? {
            method: METHOD,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        : {};

    try {
      const response = await fetch(URL, options);

      if (!response.ok) {
        const responseData = await response.json();
        console.log("error", responseData.error.message);
        throw new Error(responseData.error.message);
      }
      const data = await response.json();
      console.log("data", data.result.data);
      setData(data.result.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  function resetData() {
    setData(null);
  }

  return { data, error, isLoading, postRequest, resetData };
};
