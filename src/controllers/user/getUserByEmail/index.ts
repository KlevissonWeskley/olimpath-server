import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../../../lib/prisma"
import z from 'zod'

export async function getUserByEmail(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    email: z.string().email()
  })

  const { email } = paramsSchema.parse(request.params)

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      DailyProgress: true
    }
  })

  if (!user) {
    return reply.status(404).send({ message: 'Usuário não encontrado' })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const alreadyDoneToday = user.DailyProgress.some(progress => {
    const progressDate = new Date(progress.date)
    progressDate.setHours(0, 0, 0, 0)
    return progressDate.getTime() === today.getTime()
  })

  const countAbove = await prisma.user.count({
    where: {
      Points: {
        gt: user.Points
      }
    }
  })

  const rankingPosition = countAbove + 1
  const dailyQuizCount = user.DailyProgress.length

  return reply.send({
    id: user.id,
    points: user.Points,
    alreadyDoneToday,
    rankingPosition,
    dailyQuizCount
  })
}
