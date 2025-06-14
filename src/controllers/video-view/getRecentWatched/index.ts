import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getRecentWatched(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = paramsSchema.parse(request.params);

  try {
    const olympiads = await prisma.olympiad.findMany({
      where: {
        contents: {
          some: {
            videos: {
              some: {
                views: {
                  some: {
                    userId,
                    watched: true,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        contents: {
          include: {
            videos: {
              include: {
                views: {
                  where: {
                    userId,
                    watched: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Formata os dados
    const result = olympiads.map((olympiad) => {
      const allVideos = olympiad.contents.flatMap((content) => content.videos);
      const totalVideos = allVideos.length;
      const watchedVideos = allVideos.filter((video) => video.views.length > 0).length;

      return {
        olympiadId: olympiad.id,
        name: olympiad.name,
        totalVideos,
        watchedVideos,
      };
    });

    return reply.status(200).send(result);
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro ao buscar vídeos assistidos" });
  }
}
