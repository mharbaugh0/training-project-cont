<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
import notAuth from '~/middleware/not-auth';

  definePageMeta({
          layout: 'public',
          
      })
</script>
