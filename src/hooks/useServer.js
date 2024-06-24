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
  const BASE_URL = "http://localhost:5173";
  let URL = "";
  switch (type) {
    case "update":
      URL = `${BASE_URL}/score/update`;
      break;
    case "gameOver":
      URL = `${BASE_URL}/score/gameOver`;
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function postRequest(requestBody) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(response.message || "there was an issue");
      }
      const stuff = await response.json();
      setData(stuff);
      console.log("response", stuff);
    } catch (error) {
      console.log("there was an error", error.message);
      setError(error.message);
    }
  }

  return { data, error, postRequest };
};
