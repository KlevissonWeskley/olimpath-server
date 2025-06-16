import { FastifyReply, FastifyRequest } from "fastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { format } from "date-fns";
import { env } from "../../../env";

const genAI = new GoogleGenerativeAI(env.API_KEY_GEMINI);

const olympiads = [
  "OBMEP",
  "ONC",
  "OBQ",
  "OBA",
  "OBL",
  "ONFIL",
  "OBR",
  "ONHB",
  "OBI",
  "OP"
];

async function generateQuiz(olympiadName: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
        Gere 5 questões no estilo da olimpíada ${olympiadName}, voltadas para o Ensino Médio. Para cada questão, gere:

        - "id": número sequencial (1 a 5)
        - "question": enunciado claro e objetivo
        - "options": lista com 5 alternativas
        - "correctAnswer": uma das opções

        Formato de resposta:
        {
            "quizTitle": "Quiz de ${olympiadName}",
            "todayQuizTitle": "5 questões para ${olympiadName}",
            "description": "Desafie-se com estas questões no estilo ${olympiadName} para o Ensino Médio!",
            "questions": [ ... ]
        }
        Retorne apenas o JSON.
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return JSON.parse(text);
}

export async function getQuiz(_: FastifyRequest, reply: FastifyReply) {
    const today = format(new Date(), 'yyyy-MM-dd')

    if (!globalThis.dailyQuiz || globalThis.dailyQuiz.date !== today) {
        const day = new Date().getDate();
        const olympiadIndex = day % olympiads.length;
        const olympiadName = olympiads[olympiadIndex];

        const quiz = await generateQuiz(olympiadName);

        globalThis.dailyQuiz = {
            date: today,
            quiz
        };
    }

    return reply.status(200).send({
        quiz: globalThis.dailyQuiz.quiz
    });
}
