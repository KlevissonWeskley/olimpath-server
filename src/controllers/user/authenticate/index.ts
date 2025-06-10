import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function authenticate(request: FastifyRequest<{ Body: { token: string } }>, reply: FastifyReply) {
  const { token } = request.body

  const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())

  const { email, name, picture } = userInfo

  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userAlreadyExists) {
      const accessToken = await reply.jwtSign({ sign: { sub: userAlreadyExists.id } })

      return reply.status(200).send({
        user: userAlreadyExists,
        accessToken,
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        avatarUrl: picture,
      },
    })

    const accessToken = await reply.jwtSign({ sign: { sub: user.id } })

    return reply.status(201).send({
      message: 'Usuário criado',
      user,
      accessToken,
    })
  } catch (err: any) {
    throw new Error(err)
  }
}