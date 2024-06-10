<template>
    <div>
      <ClientOnly>
        <Navbar v-if="isAuthenticated" />
        <nav v-else>
          <nuxt-link to="/register">Register</nuxt-link>
          <nuxt-link to="/login">Login</nuxt-link>
        </nav>
      </ClientOnly>
      <NuxtPage />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Navbar from '~/components/Navbar.vue';
  import { useRouter } from 'vue-router';
  
  const isAuthenticated = ref(false);
  const router = useRouter();
  
  onMounted(() => {
    isAuthenticated.value = !!localStorage.getItem('token');
  });
  
  // Watch for route changes to update the authentication state
  router.afterEach(() => {
    isAuthenticated.value = !!localStorage.getItem('token');
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
  