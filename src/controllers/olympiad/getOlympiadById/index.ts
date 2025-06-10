import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function getOlympiadById(request: FastifyRequest, reply: FastifyReply) {
    const queryParamsSchema = z.object({
        id: z.string().cuid()
    })

    const { id } = queryParamsSchema.parse(request.params)

    try {
        const olympiad = await prisma.olympiad.findUnique({
            where: {
                id,
            },
            include: {
                contents: {
                    include: {
                        videos: true
                    }
                }
            }
        })

        if (!olympiad) {
            return reply.status(404).send('Olimpíada não encontrada.')
        }

        return reply.status(200).send({
            olympiad,
        })
    } catch (err: any) {
        throw new Error(err)
    }
}