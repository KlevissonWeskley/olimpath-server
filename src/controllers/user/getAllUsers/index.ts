import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAllUsers(_: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany()

    return reply.status(200).send({
        users,
    })
}