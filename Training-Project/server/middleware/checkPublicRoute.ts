import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/login', '/register'];
  const isPublic = publicPages.includes(to.path);
  if (process.client) {
    if (isPublic) {
      document.body.setAttribute('data-public-route', 'true');
    } else {
      document.body.removeAttribute('data-public-route');
    }
  }
});
