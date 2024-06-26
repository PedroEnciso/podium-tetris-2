// export function useServer() {
//   const URL = "http://localhost:5173/";
//   // sends updates to the server after every score change
//   // lets server calculate the score independently
//   async function updateScore(lines, level) {
//     try {
//       const response = await fetch(`${URL}/score/update`, {
//         method: "POST",
//         body: {
//           lines,
//           level,
//         },
//       });
//       console.log("update score response", response);
//     } catch (error) {
//       console.log("found an error", error.message);
//     }
//   }

//   async function submitGameOver(score, CustomerId) {
//     try {
//       const response = await fetch(`${URL}/score/gameOver`, {
//         method: "POST",
//         body: {
//           score,
//           CustomerId,
//         },
//       });
//       console.log("update game over", response);
//     } catch (error) {
//       console.log("found an error", error.message);
//     }
//   }

//   return { updateScore, submitGameOver };
// }

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
        throw new Error(
          response.status === 406
            ? responseData.message
            : "There was an issue. Please try again."
        );
      }
      setData(await response.json());
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
