<template>
  <div>
    <h1 class="font-serif text-2xl pl-3">Welcome, {{ name }}</h1>
    <body class="min-h-screen bg-gradient-to-t from-green-300 to-30% opacity-40"></body>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
        layout: 'default'
    })

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//Define the name ref
const name = ref<string | null>(null);
const router = useRouter();

//Check if the name is stored in local storage/ user is authenticated
onMounted(() => {
  const storedName = localStorage.getItem('name');
  if (!storedName) {
    router.push('/login');
  } else {
    name.value = storedName;
  }
});
</script>
