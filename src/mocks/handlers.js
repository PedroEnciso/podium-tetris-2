import { http, HttpResponse } from "msw";

const URL = "https://321-podium.elevatedloyalty.com/api/public";

export const handlers = [
  http.post(`${URL}/startGame`, () => {
    return HttpResponse.json({ message: "Unacceptable name" }, { status: 406 });
    return new HttpResponse(123, {
      status: 201,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }),

  // intercept api/score/update
  http.post(`${URL}/updateScore`, async ({ request }) => {
    const { lines, level, gameId } = await request.json();
    const bonusLevel = 100 * (level * level);
    const bonusRows = 40 * (lines * lines - 1);
    const newScore = 300 * lines + bonusRows + bonusLevel;
    return HttpResponse.json({ score: newScore, gameId });
  }),

  // intercept api/score/gameOver
  http.post(`${URL}/checkScoreRank`, async ({ request }) => {
    return new HttpResponse(6, {
      status: 201,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }),

  // intercept api/score/newHighScore
  http.post(`${URL}/saveScoreToLeaderboard`, async ({ request }) => {
    const { name } = await request.json();
    if (name === "poop") {
      return HttpResponse.json(
        { message: "Unacceptable name" },
        { status: 406 }
      );
    }
    return HttpResponse.json({
      id: 1,
      place: 1,
      name: "PEDR",
      newHighScore: true,
    });
  }),

  http.get(`${URL}/scoreboard`, () => {
    return HttpResponse.json({
      scores: [
        {
          rank: 1,
          score: 100000,
          name: "PAUL",
        },
        {
          rank: 2,
          score: 90000,
          name: "PEDR",
        },
        {
          rank: 3,
          score: 90000,
          name: "LUKA",
        },
        {
          rank: 4,
          score: 80000,
          name: "JOHN",
        },
        {
          rank: 5,
          score: 900,
          name: "DYLN",
        },
      ],
    });
  }),
];
