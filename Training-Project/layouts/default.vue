<template>
    <div>
      <ClientOnly>
        <Navbar v-if="!isPublicRoute && isAuthenticated" />
        <nav v-else>
          <nuxt-link v-if="!isAuthenticated" to="/register">Register</nuxt-link>
          <nuxt-link v-if="!isAuthenticated" to="/login">Login</nuxt-link>
        </nav>
      </ClientOnly>
      <NuxtPage />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from '~/components/Navbar.vue';
  
  const isAuthenticated = ref(false);
  const isPublicRoute = ref(false);
  
  const publicPages = ['/login', '/register'];
  
  const route = useRoute();
  
  const updateAuthState = () => {
    if (process.client) {
      isAuthenticated.value = !!localStorage.getItem('token');
      isPublicRoute.value = publicPages.includes(route.path);
    }
  };
  
  onMounted(() => {
    updateAuthState();
    watch(
      () => route.fullPath,
      () => {
        updateAuthState();
      }
    );
  });
  </script>
  
  <style>
  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-content: center;
  }
  
  nav a {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  nav a:hover {
    background-color: #45a049;
  }
  </style>
  