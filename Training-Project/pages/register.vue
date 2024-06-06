<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const router = useRouter();

const register = async () => {
  try {
    // Send a POST request to the api endpoint
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Convert the form data to a JSON string
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    });

    // If the server responds with an error, throw an error
    if (!response.ok) {
      throw new Error(await response.text());
    }

    // If the server responds successfully, go to the login page
    await router.push('/login');
  } catch (err: any) {
    // If an error is thrown, set the error message
    error.value = err.message;
  }
};
</script>
