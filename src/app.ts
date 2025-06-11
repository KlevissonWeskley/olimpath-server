import Fastify from 'fastify'

import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import googleAuth from './plugins/google-auth';

import { userRoutes } from './routes/userRoutes';
import { env } from './env';
import { olympiadRoutes } from './routes/olympiadRoutes';
import { healthRoutes } from './controllers/cron-job';

export const app = Fastify()

app.register(fastifyCookie)
app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
})

app.register(googleAuth)

// routes
app.register(userRoutes)
app.register(olympiadRoutes)
app.register(healthRoutes)