import { FastifyInstance } from "fastify";
import { simulatedScore } from "../controllers/gamification/simulatedScore";
import { todayQuizScore } from "../controllers/gamification/todayQuizScore";
import { ranking } from "../controllers/gamification/ranking";

export async function gamificationRoutes(app: FastifyInstance) {
    app.post('/gamification/users/:userId/simulated/score', simulatedScore)
    app.get('/gamification/users/:userId/quiz/score', todayQuizScore)
    app.get('/gamification/ranking', ranking)
}