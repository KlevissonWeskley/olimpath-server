import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { prisma } from "../../../lib/prisma";

export async function deleteChat(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        chatId: z.string()
    })

    const { chatId } = paramsSchema.parse(request.params);

    try {
        const chat = await prisma.chat.delete({
            where: {
                id: chatId
            }
        })

        if (!chat) {
            return reply.status(404).send("Chat não encontrado.");
        }

        return reply.status(204).send({ message: 'Chat deletado.' })
    } catch (err) {
        console.error(err);
        return reply.status(500).send("Erro ao tentar deletar chat.");
    }
}