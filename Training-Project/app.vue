<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
    <h1>hi</h1>
      <!-- <NuxtWelcome /> -->
  </div>
 
</template>
