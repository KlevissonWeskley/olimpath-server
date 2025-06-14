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

        return reply.status(201).send(view)
    } catch (err) {
        console.log(err)
    }
}