import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'

export async function getWatchedVideosFromOlympiad(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
    olympiadId: z.string(),
  })

  const { userId, olympiadId } = paramsSchema.parse(request.params)

  try {
    const videoViews = await prisma.videoView.findMany({
      where: {
        userId,
        watched: true,
        video: {
          content: {
            olympiadId
          }
        }
      },
      select: {
        videoId: true
      }
    })

    const watchedVideos = videoViews.map(view => view.videoId)

    return reply.status(200).send({ watchedVideos })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ message: 'Erro ao buscar vídeos assistidos' })
  }
}
