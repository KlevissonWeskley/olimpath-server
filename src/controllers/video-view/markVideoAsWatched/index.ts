import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function markVideoAsWatched(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
    videoId: z.string().cuid()
  })

  const { userId, videoId } = paramsSchema.parse(request.params)

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })
    if (!userExists) {
      return reply.status(404).send({ error: "Usuário não encontrado." })
    }

    const view = await prisma.videoView.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId
        }
      },
      update: {
        watched: true
      },
      create: {
        userId,
        videoId,
        watched: true
      }
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        Points: { increment: 5 }
      }
    })

    return reply.status(201).send(view)
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ error: "Erro interno ao marcar vídeo como assistido." })
  }
}
