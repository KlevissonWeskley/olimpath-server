import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function createChat(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    userId: z.string(),     
  });

  const { userId } = createBodySchema.parse(request.body);

  try {
    // Opcional: verifica se usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return reply.status(404).send("Usuário não encontrado.");
    }

    const chat = await prisma.chat.create({
      data: {
        userId,
      }
    })

    return reply.status(201).send({ chat });
  } catch (err: any) {
    console.error("❌ Erro ao criar chat:");
    console.error("Mensagem:", err.message);
    console.error("Stack trace:", err.stack);

    if (err.code) console.error("Código Prisma:", err.code);
    if (err.meta) console.error("Meta Prisma:", err.meta);
    if (err.name) console.error("Nome do erro:", err.name);

    return reply.status(500).send({
      error: "Erro ao criar chat.",
      message: err.message,
      stack: err.stack,
      code: err.code ?? null,
      name: err.name ?? null,
      meta: err.meta ?? null,
    });
  }
}
