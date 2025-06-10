import fp from 'fastify-plugin';
import fastifyOauth2 from '@fastify/oauth2';
import { env } from '../env';

export default fp(async (fastify) => {
  fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/auth/google',
    callbackUri: 'http://localhost:3333/auth/google/callback',
  });
});
