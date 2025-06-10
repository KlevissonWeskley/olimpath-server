import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        avatarUrl: z.string().optional()
    })

    const { name, email, avatarUrl } = registerUserBodySchema.parse(request.body)

    try {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (userAlreadyExists) return reply.status(409).send({ message: 'Usuário já existe.' })

        const user = await prisma.user.create({
            data: {
                name,
                email,
                avatarUrl
            }
        })

        return reply.status(201).send({
            id: user.id
        })
    } catch (err) {
        return reply.status(500).send('Erro ao criar usuário')
    }
}