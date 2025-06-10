import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function updateOlympiad(request: FastifyRequest, reply: FastifyReply) {
    const queryUpdateParams = z.object({
        id: z.string().cuid()
    })

    const updateBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
    }) 

    const { id } = queryUpdateParams.parse(request.params)

    const { name, description } = updateBodySchema.parse(request.body)

    try {
        await prisma.olympiad.update({
            where: {
                id,
            },
            data: {
                name,
                description,
            }
        })

        return reply.status(204).send('Olimpíada atualizada')
    } catch (err: any) {
        throw new Error(err)
    }
}