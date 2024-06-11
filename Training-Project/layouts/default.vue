<template>
    <header>
        <div>
        <ClientOnly>
            <Navbar/>
            <UVerticalNavigation :links="links" />
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
  
  const links = [{
    label: 'Account',
    to: '/account', 
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/9009142?s=200&v=4'
    },
    badge: 100
  }, {
    label: 'Documentation',
    icon: 'i-heroicons-command-line',
    to: 'https://github.com/bioneos/training-project/tree/main',
  }, {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/components/command-palette'
  }]
  
  
  const accountOptions = [{
    label: 'View & Change Display Name',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/9009142?s=200&v=4'
    },
  }, {
    label: 'View & Change Email',
    icon: "i-heroicons-envelope",
  }, {
    label: 'Password Reset',
    icon: "i-heroicons-lock-closed",
  }, {
    label: 'Delete Account',
    icon: 'i-heroicons-trash',
  }]

  </script>
  
 
  