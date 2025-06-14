import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getRecentWatched(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = paramsSchema.parse(request.params);

  try {
    // Busca todas as olimpíadas que têm pelo menos um vídeo assistido pelo usuário
    const olympiads = await prisma.olympiad.findMany({
      where: {
        contents: {
          some: {
            videos: {
              some: {
                VideoView: {
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
                VideoView: {
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
      const watchedVideos = allVideos.filter((video) => video.VideoView.length > 0).length;

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
