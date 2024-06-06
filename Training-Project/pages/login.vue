<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const router = useRouter();

const login = async () => {
  try {

    //A POST request is sent to the /api/auth/login endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });


    //If the server responds with an error, an error is thrown
    if (!response.ok) {
      throw new Error(await response.text());
    }

    //If the server responds successfully, the token and name are stored 
    //in the local storage and the user is 
    //redirected to the welcome page
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    await router.push('/welcome');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>
