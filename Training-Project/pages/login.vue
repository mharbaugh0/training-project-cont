<template>
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
          <div v-if="error" style="color: red; font-weight: bold;">{{ error }}</div>
        </div>

        <UDivider label="OR" orientation="vertical" />

        <div class="space-y-4 flex flex-col justify-center pr-40">
          <UAlert
            icon="i-heroicons-command-line"
            description="These functions are temporarily unavailable."
            title="We're sorry!"
          />
          <ULink
            to="https://github.com/login"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UButton disabled variant="outline" color="black" label="Login with GitHub" icon="i-logos-github-icon" block />
          </ULink>

          <ULink
            to="https://accounts.google.com"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UButton disabled variant="outline" color="black" label="Login with Google" icon="i-simple-icons-google" block />
          </ULink>
        </div>
      </UCard>
    </div>
  </form>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
        layout: 'public'
    })

/// Define the form and error refs
const form = ref({ email: '', password: '' });
const error = ref<string | null>(null);
const router = useRouter();


// Define the cookies
const tokenCookie = useCookie('token');
const nameCookie = useCookie('name');
const emailCookie = useCookie('email');
const idCookie = useCookie('id')

const login = async () => {
  try {
    // Send a login request to the server
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    // Handle the non-ok response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    // Store token, name, id, and email in cookies and local storage
    const data = await response.json();

    tokenCookie.value = data.token;
    nameCookie.value = data.name;
    emailCookie.value = data.email;
    idCookie.value = data.id;

    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('id', data.id);


    // Set the firstLogin flag in localStorage
    localStorage.setItem('firstLogin', 'true');
    await router.push('/welcome');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>

<style>
button {
  margin-left: 0px;
}
</style>

