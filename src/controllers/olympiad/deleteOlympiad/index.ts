import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function deleteOlympiad(request: FastifyRequest, reply: FastifyReply) {
    const queryParamsSchema = z.object({
        olympiadId: z.string().cuid()
    })

    const { olympiadId } = queryParamsSchema.parse(request.params)

    try {
        await prisma.olympiad.delete({
            where: {
                id: olympiadId,
            }
        })

        return reply.status(204).send('Olimpíada deletada.')
    } catch (err: any) {
        throw new Error(err)
    }
}