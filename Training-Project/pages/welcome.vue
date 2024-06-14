<template>
  <div>
    <h1>Welcome, {{ name }}</h1>
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
