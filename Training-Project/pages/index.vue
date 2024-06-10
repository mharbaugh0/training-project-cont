<template>
  <div>
    <h1>This is the home page</h1>
    <UVerticalNavigation :links="links" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

</script>