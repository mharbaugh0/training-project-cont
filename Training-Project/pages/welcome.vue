<template>
    <div>
      <h1>Welcome, {{ name }}</h1>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const name = ref<string | null>(null);
  const router = useRouter();
  
  onMounted(() => {
    const storedName = localStorage.getItem('name');
    if (!storedName) {
      router.push('/login');
    } else {
      name.value = storedName;
    }
  });
  </script>
  