import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getChatById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    chatId: z.string()
  });

  const { chatId } = paramsSchema.parse(request.params);

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!chat) {
      return reply.status(404).send("Chat não encontrado.");
    }

    return reply.send({ chat });
  } catch (err) {
    console.error(err);
    return reply.status(500).send("Erro ao buscar chat.");
  }
}
