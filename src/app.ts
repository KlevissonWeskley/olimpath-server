import Fastify from 'fastify'

import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie'

import { userRoutes } from './routes/userRoutes';
import { olympiadRoutes } from './routes/olympiadRoutes';
import { healthRoutes } from './controllers/cron-job';
import { videosRoutes } from './routes/videosRoutes';
import { chatRoutes } from './routes/chatRoutes';
import { todayQuiz } from './routes/todayQuiz';
import { gamificationRoutes } from './routes/gamificationRoutes';

export const app = Fastify()

app.get('/', (_, reply) => {
  return reply.status(200).send({
    message: 'Bem-vindo a API do OlimPath!'
  })
})

app.register(fastifyCookie)
app.register(fastifyCors, {
  origin: '*'
})

// routes
app.register(userRoutes)
app.register(olympiadRoutes)
app.register(healthRoutes)
app.register(videosRoutes)
app.register(chatRoutes)
app.register(todayQuiz)
app.register(gamificationRoutes)