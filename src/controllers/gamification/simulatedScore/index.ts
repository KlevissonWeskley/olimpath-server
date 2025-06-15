import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
import { pointsForSimulated } from '../../../utils/pointsForSimulated'

export async function simulatedScore(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string()
  })

  const bodySchema = z.object({
    correctAnswers: z.number().min(0),
    totalQuestions: z.number().min(1)
  })

  const { userId } = paramsSchema.parse(request.params)
  const { correctAnswers, totalQuestions } = bodySchema.parse(request.body)

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      return reply.status(404).send({ error: "Usuário não encontrado." })
    }

    const points = pointsForSimulated(correctAnswers, totalQuestions)

    await prisma.user.update({
      where: { id: userId },
      data: {
        Points: {
          increment: points
        }
      }
    })

    return reply.status(201).send({ message: "Pontuação registrada com sucesso.", points })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ error: "Erro interno ao registrar pontuação do simulado." })
  }
}
