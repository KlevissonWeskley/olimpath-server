import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function ranking(request: FastifyRequest, reply: FastifyReply) {
    const ranking = await prisma.user.findMany({
        orderBy: { Points: 'desc' },
        select: {
            id: true,
            name: true,
            avatarUrl: true,
            Points: true
        },
        take: 100 
    })

    return reply.status(200).send({
        ranking
    })
}