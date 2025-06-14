import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../../lib/prisma";
import z from 'zod';

export async function getUserByEmail(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    email: z.string().email()
  })

  const { email } = paramsSchema.parse(request.params)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return reply.status(404).send({ message: 'Usuário não encontrado' })

  return reply.send({ id: user.id })
}
