import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAllOlympiads(_: FastifyRequest, reply: FastifyReply) {
    const olympiads = await prisma.olympiad.findMany()

    return reply.status(200).send({
        olympiads,
    })
}