<template>
  <div>
    <h1 class="font-default text-xl flex justify-center pt-5">Welcome, {{ name }}</h1>
    <body class="min-h-screen bg-gradient-to-t from-green-300 to-30% opacity-40"></body>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
        layout: 'default',
        middleware: 'require-auth'
    })

// console.log(useCookie('name'))
const displayName = useCookie('name').value;
// console.log('Name:', displayName);


//Define the name ref
const name = ref<string | null>(displayName);
const router = useRouter();

</script>
