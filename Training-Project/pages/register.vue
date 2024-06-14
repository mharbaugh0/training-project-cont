<template>
  <ClientOnly>
    <UButton block
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
      class="flex justify-end pr-5"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>

  <UDivider :avatar="{ src: 'https://avatars.githubusercontent.com/u/9009142?s=200&v=4' }" />
  
  <div>
    <h1>Please enter...</h1>
    <form @submit.prevent="register">
      <div>
        <UFormGroup label="Name" required>
          <UInput v-model="form.name" type="text" icon="i-heroicons-lock-closed" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Email" required>
          <UInput v-model="form.email" type="email" icon="i-heroicons-envelope" placeholder="you@example.com" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Password" required>
          <UInput v-model="form.password" type="password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
      </div>
      <UButton variant="soft" type="submit">Register</UButton>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>



<script setup lang="ts">

definePageMeta({
        layout: 'public'
    })

import { ref } from 'vue';
import { useRouter } from 'vue-router';

//Define the form and error variables
const form = ref({ name: '', email: '', password: '' });
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

const register = async () => {
  try {
    //Send the registration request to the server
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    // Handle non-ok response
    if (!response.ok) {
      throw new Error(await response.text());
    }
   
    // Store token and name in local storage and redirect to login page
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email)
    await router.push('/login');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>
