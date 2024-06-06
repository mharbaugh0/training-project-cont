// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/api', handler: '~/server/api' }
  ],
  typescript: {
    strict: true,
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },
});