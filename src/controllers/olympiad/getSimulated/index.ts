import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

import { obmepSimulated } from "../../../utils/simulated/obmep";
import { oncSimulated } from "../../../utils/simulated/onc";
import { obqSimulated } from "../../../utils/simulated/obq";
import { obaSimulated } from "../../../utils/simulated/oba";
import { oblSimulated } from "../../../utils/simulated/obl";
import { onfilSimulated } from "../../../utils/simulated/onfil";
import { obrSimulated } from "../../../utils/simulated/obr";
import { onhbSimulated } from "../../../utils/simulated/onhb";
import { obiSimulated } from "../../../utils/simulated/obi";
import { opSimulated } from "../../../utils/simulated/op";

const simulateds: Record<string, any> = {
  OBMEP: obmepSimulated,
  ONC: oncSimulated,
  OBQ: obqSimulated,
  OBA: obaSimulated.simulated,
  OBL: oblSimulated,
  ONFIL: onfilSimulated,
  OBR: obrSimulated,
  ONHB: onhbSimulated,
  OBI: obiSimulated,
  OP: opSimulated,
};

export async function getSimulated(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = paramsSchema.parse(request.params);

  try {
    const olympiad = await prisma.olympiad.findUnique({
      where: { id },
    });

    if (!olympiad) {
      return reply.status(404).send({ error: "Olimpíada não encontrada." });
    }

    const simulatedData = simulateds[olympiad.name.toUpperCase()];

    if (!simulatedData) {
      return reply
        .status(404)
        .send({ error: "Simulado não encontrado para essa olimpíada." });
    }

    return reply.status(200).send(simulatedData);
  } catch (err: any) {
    console.error(err);
    return reply.status(500).send({ error: "Erro interno do servidor." });
  }
}
