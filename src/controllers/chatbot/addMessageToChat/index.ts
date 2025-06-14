import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function addMessageToChat(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    chatId: z.string()
  });

  const bodySchema = z.object({
    sender: z.enum(['USER', 'AI']),
    content: z.string().min(1)
  });

  const { chatId } = paramsSchema.parse(request.params);
  const { sender, content } = bodySchema.parse(request.body);

  try {
    const chatExists = await prisma.chat.findUnique({
      where: { id: chatId }
    });

    if (!chatExists) {
      return reply.status(404).send("Chat não encontrado.");
    }

    const message = await prisma.message.create({
      data: {
        chatId,
        sender,
        content
      }
    });

    return reply.status(201).send({ message });
  } catch (err) {
    console.error(err);
    return reply.status(500).send("Erro ao adicionar mensagem.");
  }
}
