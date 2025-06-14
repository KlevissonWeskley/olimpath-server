import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getChatsByUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string()
  });

  const { userId } = paramsSchema.parse(request.params);

  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: { content: true }
        }
      }
    });

    return reply.send({ chats });
  } catch (err) {
    console.error(err);
    return reply.status(500).send("Erro ao buscar chats.");
  }
}