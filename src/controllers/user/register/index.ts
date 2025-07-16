import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerUserBodySchema = z.object({
        id: z.string().optional(),   
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6).optional(),
        avatarUrl: z.string().optional()
    })

    const { id, name, email, password, avatarUrl } = registerUserBodySchema.parse(request.body)

    try {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (userAlreadyExists) return reply.status(409).send({ message: 'Usuário já existe.' })

        let passwordHashed: string | null = null
        if (password) {
            passwordHashed = await hash(password, 10) 
        }

        const user = await prisma.user.create({
            data: {
                id: id ?? randomUUID(),
                name,
                email,
                password: passwordHashed,
                avatarUrl
            }
        })

        const token = await reply.jwtSign({
            sign: { sub: user.id }
        })

        return reply.status(201).send({
            user,
            token,
        })
    } catch (err) {
        return reply.status(500).send('Erro ao criar usuário')
    }
}