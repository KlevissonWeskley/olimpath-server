import { FastifyInstance } from "fastify";
import { getQuiz } from "../controllers/today-quiz/getQuiz";

export function todayQuiz(app: FastifyInstance) {
    app.get('/quiz/today', getQuiz)
}