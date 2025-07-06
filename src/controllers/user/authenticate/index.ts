import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";
import { compare } from "bcryptjs";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })
    
    const { email, password } = authenticateUserBodySchema.parse(request.body)

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) return reply.status(401).send({ message: 'Usuário ou senha incorretos' })
        
        if (user.password) {
            const passwordIsValid = await compare(password, user.password)

            if (!passwordIsValid) return reply.status(401).send({ message: 'Usuário ou senha incorretos' })
        }

        const token = await reply.jwtSign({
            sign: { sub: user.id }
        })

        return reply.status(201).send({
            user,
            token,
        })
    } catch (err) {
        console.log(err)
        return reply.code(400).send({ error: 'Erro ao autenticar usuário.' })
    }
}