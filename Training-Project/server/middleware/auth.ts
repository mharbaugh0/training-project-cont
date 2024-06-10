import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  if (!token && to.path !== '/login' && !token && to.path !== '/register') {
    return router.push('/login');
  }
});
