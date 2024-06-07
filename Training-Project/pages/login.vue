<template>
  <div class="w-full flex flex-col gap-y-4">
    <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
      <div class="space-y-4">
        <UFormGroup label="Email" name="email" required input type="email"> 
          <UInput v-model="form.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" input type="password" >
          <UInput v-model="form.password" type="password" required />
        </UFormGroup>

        <UButton variant="soft" type="submit">Login</UButton>
      </div>

      <UDivider label="OR" orientation="vertical" />

      <div class="space-y-4 flex flex-col justify-center">
        <UButton variant="outline" color="black" label="Login with GitHub" icon="i-simple-icons-github" block />
        <UButton variant="outline" color="black" label="Login with Google" icon="i-simple-icons-google" block />
      </div>
    </UCard>
  </div>
</template>


<script setup lang="ts">
const form = reactive({ email: 'mail@example.com', password: 'password' })
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const router = useRouter();

const login = async () => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    await router.push('/');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>
