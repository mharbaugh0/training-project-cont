
<<<<<<< HEAD
const items = [{ //Account settings tabs
  slot: 'account',
  label: 'Account'
}, {
  slot: 'password',
  label: 'Password'
}]

//Define the name ref
const form = ref({ name: '', email: ''});
const router = useRouter();

const storedName = localStorage.getItem('name');
const storedEmail = localStorage.getItem('email');

const accountForm = reactive({ name: storedName, email: storedEmail })
const passwordForm = reactive({ currentPassword: '', newPassword: '' })


function onSubmitAccount () {
  console.log('Submitted form:', accountForm)
}

function onSubmitPassword () {
  console.log('Submitted form:', passwordForm)
}


</script>
=======
>>>>>>> pass-reset

<template>
  <div>
  <UTabs :items="items" class="w-full"> 
    <template #account="{ item }"> <!--Account settings form, Account tab-->
      <UCard @submit.prevent="onSubmitAccount">
        <template #header>
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Make changes to your account here. Click save when you're done to save your changes.
          </p>
        </template>

        <UFormGroup label="Display Name" name="name" class="mb-3">
          <UInput v-model="accountForm.name" />
        </UFormGroup>
        <UFormGroup label="Email" name="name">
          <UInput v-model="accountForm.email" />
        </UFormGroup>

        <template #footer>
          <UButton type="submit" color="black">
            Save account
          </UButton>
        </template>
      </UCard>
      
    </template>
    

    <template #password="{ item }"> <!--Account settings form, Password tab-->
      <UCard @submit.prevent="onSubmitPassword">
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Change your password here. After saving, you'll be logged out. Make sure to keep a copy for your records!
          </p>
        </template>

        <UFormGroup label="Current Password" name="current" required class="mb-3">
          <UInput v-model="passwordForm.currentPassword" type="password" required />
        </UFormGroup>
        <UFormGroup label="New Password" name="new" required class="mb-3">
          <UInput v-model="passwordForm.newPassword" type="password" required />
        </UFormGroup>
<<<<<<< HEAD
        
=======
        <UFormGroup label="Confirm New Password" name="confirmNew" required>
          <UInput v-model="passwordForm.confirmedNewPassword" type="password" required />
        </UFormGroup>
>>>>>>> pass-reset

        <template #footer>
          <UButton type="submit" color="black">
            Save password
          </UButton>
        </template>
      </UCard>
      
    </template>
  </UTabs>
  <body class="min-h-screen bg-gradient-to-t from-green-300 to-60% opacity-40"></body>
</div>
</template> 

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const items = [{
  slot: 'account',
  label: 'Account'
}, {
  slot: 'password',
  label: 'Password'
}]

const name = ref<string | null>(null);
const router = useRouter();
const storedName = localStorage.getItem('name');

const accountForm = reactive({ name: storedName, email: '' })
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmedNewPassword: '' })

function onSubmitAccount () {
  console.log('Submitted form:', accountForm);
}

async function onSubmitPassword() {
  console.log('Submitted form:', passwordForm);

  try {
    const token = localStorage.getItem('id');

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordForm),
    });

    if (!response.ok) {
      throw new Error('Response not OK');
    }

    const data = await response.json();
    console.log('Response data:', data);

    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    // Redirect to login page
    await router.push('/login');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});

onMounted(() => {
  name.value = storedName;
});
</script>

