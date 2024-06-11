<template>
    <header>
        <div>
        <ClientOnly>
            <Navbar/>
        </ClientOnly>
        <NuxtPage />
        </div>
    </header>
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
  
  watch(
    () => route.path,
    () => {
      updateAuthState();
    },
    { immediate: true }
  );
  
  onMounted(() => {
    updateAuthState();
  });
  </script>
  
 
  