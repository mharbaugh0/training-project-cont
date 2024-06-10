<template>
  <div>
    <h1>Welcome, {{ name }}</h1>
    <UVerticalNavigation :links="links" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const name = ref<string | null>(null);
const router = useRouter();

const links = [
  {
    label: 'Account',
    to: '/account',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/9009142?s=200&v=4'
    },
    badge: 100
  },
  {
    label: 'Documentation',
    icon: 'i-heroicons-command-line',
    to: 'https://github.com/bioneos/training-project/tree/main'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/components/command-palette'
  }
];

onMounted(() => {
  const storedName = localStorage.getItem('name');
  if (!storedName) {
    router.push('/login');
  } else {
    name.value = storedName;
  }
});
</script>
