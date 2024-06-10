<template>
  <ClientOnly>
    <UButton block
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>

  <UDivider :avatar="{ src: 'https://avatars.githubusercontent.com/u/9009142?s=200&v=4' }" />

  <form @submit.prevent="login">
    <div class="w-full flex flex-col gap-y-4">
      <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
        <div class="space-y-4">
          <UFormGroup label="Email" required>
            <UInput v-model="form.email" type="email" placeholder="you@example.com" icon="i-heroicons-envelope" />
          </UFormGroup>

          <UFormGroup label="Password" required>
            <UInput v-model="form.password" type="password" icon="i-heroicons-lock-closed" />
          </UFormGroup>

          <UButton variant="soft" type="submit">Login</UButton>
        </div>

        <UDivider label="OR" orientation="vertical" />

        <div class="space-y-4 flex flex-col justify-center">
          <ULink
            to="https://github.com/login"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UButton variant="outline" color="black" label="Login with GitHub" icon="i-simple-icons-github" block />
          </ULink>

          <ULink
            to="https://accounts.google.com"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UButton variant="outline" color="black" label="Login with Google" icon="i-simple-icons-google" block />
          </ULink>
        </div>
      </UCard>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({ email: '', password: '' });
const error = ref<string | null>(null);
const router = useRouter();

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});

const login = async () => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    await router.push('/welcome');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>
