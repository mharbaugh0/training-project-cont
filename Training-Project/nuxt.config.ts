// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
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