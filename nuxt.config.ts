// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@sidebase/nuxt-auth'],
  auth: {
    enableGlobalAppMiddleware: true,
  },
  devServer: {
    port: Number(process.env.APP_PORT),
  },
  srcDir: "src/",
  
  typescript: {
    strict: false,
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    public: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  },

  hooks: {
    'build:done': () => {
      const { execSync } = require('child_process');
      execSync('git restore .nuxt/.gitkeep');
      execSync('git restore node_modules/.gitkeep');
    }
  },

});