<template>
  <div>
    <h1 class="pb-2">Please enter...</h1>
    <form @submit.prevent="register"> <!--Register form-->
      <div>
        <UFormGroup label="Name" required class="pb-1" >
          <UInput v-model="form.name" type="text" icon="i-heroicons-lock-closed"/>
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Email" required class="pb-1">
          <UInput v-model="form.email" type="email" icon="i-heroicons-envelope" placeholder="you@example.com" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Password" name="password" required class="pb-1"> 
          <UInput v-model="form.password" type="password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="Confirm Password" name="confirmPassword" required>
          <UInput v-model="form.confirmPassword" type="password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
      </div>
      <UButton variant="soft" type="submit">Register</UButton>
    </form>
    <div v-if="error" style="color: red; font-weight: bold;">{{ error }}</div>        
  </div>
</template>


<script setup lang="ts">

definePageMeta({
        layout: 'public'
    })

import { ref } from 'vue';
import { useRouter } from 'vue-router';

//Define the form and error variables
const form = ref({ name: '', email: '', password: '', confirmPassword: ''});
const error = ref<string | null>(null);
const router = useRouter();



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
    localStorage.setItem('id', data.id)
    console.log(data)
    await router.push('/login');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>

<style>
div {
  margin-left: 4px;
  margin-right: 4px;
}

button {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
