import { http, HttpResponse } from "msw";

const URL = "http://localhost:5173";

export const handlers = [
  // intercept api/score
  http.get(`${URL}/score`, () => {}),

  // intercept api/score/update
  http.post(`${URL}/score/update`, async ({ request }) => {
    const { lines, level } = await request.json();
    const bonusLevel = 100 * (level * level);
    const bonusRows = 40 * (lines * lines - 1);
    const newScore = 300 * lines + bonusRows + bonusLevel;
    return HttpResponse.json({ score: newScore });
  }),

  // intercept api/score/gameOver
  http.post(`${URL}/score/gameOver`, async ({ request }) => {
    if (Math.random() < 0.5) {
      return HttpResponse.json({
        ScoreId: 1,
        place: 4,
        newHighScore: true,
      });
    } else {
      return HttpResponse.json({
        ScoreId: 1,
        place: 10,
        newHighScore: false,
      });
    }
  }),

  // intercept api/score/newHighScore
  http.post(`${URL}/score/newHighScore`, async ({ request }) => {
    const { name } = await request.json();
    if (name === "poop") {
      return HttpResponse.json({ error: "Unacceptable name" }, { status: 406 });
    }
    return HttpResponse.json({});
  }),
];
