<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
import { NuxtPage } from '#build/components';
  definePageMeta({
          layout: 'public'
      })
</script>