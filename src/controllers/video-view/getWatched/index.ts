import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function getWatched(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        userId: z.string(),
        videoId: z.string().cuid()
    })

    const { userId, videoId } = paramsSchema.parse(request.params)

    try {
        const view = await prisma.videoView.findUnique({
            where: {
                userId_videoId: {
                    userId,
                    videoId,
                }
            }
        })
        return reply.status(200).send({
            watched: view?.watched || false
        })
    } catch (err) {
        console.log(err)
    }
}