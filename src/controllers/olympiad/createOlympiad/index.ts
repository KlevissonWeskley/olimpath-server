import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function createOlympiad(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
    }) 

    const { name, description } = createBodySchema.parse(request.body)

    try {
        const olympiadAlreadyExists = await prisma.olympiad.findUnique({
            where: {
                name,
            }
        })

        if (olympiadAlreadyExists) {
            return reply.status(400).send('Olimpíada já cadastrada.')
        }

        const olympiad = await prisma.olympiad.create({
            data: {
                name,
                description,
            }
        })

        return reply.status(201).send({
            olympiad,
        })
    } catch (err: any) {
        throw new Error(err)
    }
}