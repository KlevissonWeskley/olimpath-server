import { FastifyReply, FastifyRequest } from "fastify";
import { materials } from "./materials";

export function getMaterials(_: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send({
        materials
    })
}