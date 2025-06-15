import { FastifyReply, FastifyRequest } from "fastify"
import z from 'zod'
import { prisma } from "../../../lib/prisma"

export async function todayQuizScore(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string()
  })

  const { userId } = paramsSchema.parse(request.params)

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existing = await prisma.dailyQuizProgress.findUnique({
      where: {
        userId_date: {
          userId,
          date: today
        }
      }
    })

    if (existing) {
      return reply.status(400).send({
        message: "Você já respondeu o quiz de hoje.",
        alreadyDone: true
      })
    }

    const progress = await prisma.dailyQuizProgress.create({
      data: {
        userId,
        date: today,
        count: 1
      }
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        Points: { increment: 5 }
      }
    })

    return reply.status(200).send({
      message: "Progresso do dia registrado com sucesso!",
      progress
    })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ error: "Erro interno ao registrar pontuação do quiz diário." })
  }
}
