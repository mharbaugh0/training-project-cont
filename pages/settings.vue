<template>
  <div>
    <UTabs :items="items" class="w-full">
      <!-- Name settings form -->
      <template #Name="{ item }">
        <UCard @submit.prevent="onSubmitName">
          <template #header>
            <p class="text-base font-semibold leading- text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Change your display name here. Click save when you're done to save your changes.
            </p>
          </template>

          <UFormGroup label="Display Name" name="newName" class="mb-3">
            <UInput v-model="nameForm.newName" :placeholder="name"/>
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Save Name
            </UButton>
            <div v-if="nameError" style="color: red; font-weight: bold;">{{ nameError }}</div>
          </template>
        </UCard>
      </template>

      <!-- Email settings form -->
      <template #Email="{ item }">
        <UCard @submit.prevent="onSubmitEmail">
          <template #header>
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Change your login email here. Click save when you're done to save your changes.
            </p>
          </template>

          <UFormGroup label="Current Email" name="currentEmail" required class="mb-3">
            <UInput v-model="emailForm.currentEmail" type="email" required />
          </UFormGroup>
          <UFormGroup label="New Email" name="newEmail" required class="mb-3">
            <UInput v-model="emailForm.newEmail" type="email" required />
          </UFormGroup>
          <UFormGroup label="Confirm New Email" name="confirmNewEmail" required>
            <UInput v-model="emailForm.confirmedNewEmail" type="email" required />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Save Email
            </UButton>
            <div v-if="emailError" style="color: red; font-weight: bold;">{{ emailError }}</div>
          </template>
        </UCard>
      </template>

      <!-- Password settings form -->
      <template #password="{ item }">
        <UCard @submit.prevent="onSubmitPassword">
          <template #header>
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Change your password here. After saving, you'll be logged out. Make sure to keep a copy for your records!
            </p>
          </template>

          <UFormGroup label="Current Password" name="currentPassword" required class="mb-3">
            <UInput v-model="passwordForm.currentPassword" type="password" required />
          </UFormGroup>
          <UFormGroup label="New Password" name="newPassword" required class="mb-3">
            <UInput v-model="passwordForm.newPassword" type="password" required />
          </UFormGroup>
          <UFormGroup label="Confirm New Password" name="confirmNewPassword" required>
            <UInput v-model="passwordForm.confirmedNewPassword" type="password" required />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Save password
            </UButton>
            <div v-if="passwordError" style="color: red; font-weight: bold;">{{ passwordError }}</div>
          </template>
        </UCard>
      </template>

      <!-- Deletion settings form -->
      <template #Deletion="{ item }">
        <UCard @submit.prevent="onDeleteAccount">
          <template #header>
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Delete your account here. This action is irreversible. Make sure you want to delete your account before proceeding.
            </p>
          </template>

          <UFormGroup label="Email" name="Email" required class="mb-3">
            <UInput v-model="deletionForm.email" type="email" required />
          </UFormGroup>
          <UFormGroup label="Current Password" name="password" required class="mb-3">
            <UInput v-model="deletionForm.password" type="password" required />
          </UFormGroup>
          <UFormGroup label="Confirm Password" name="confirmPassword" required>
            <UInput v-model="deletionForm.confirmedPassword" type="password" required />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="red">
              Delete Account
            </UButton>
            <div v-if="deletionError" style="color: red; font-weight: bold;">{{ deletionError }}</div>
          </template>
        </UCard>
      </template>
    </UTabs>
    <body class="min-h-screen bg-gradient-to-t from-green-300 to-50% opacity-55"></body>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const items = [
  { slot: 'Name', label: 'Display Name' },
  { slot: 'Email', label: 'Email' },
  { slot: 'password', label: 'Password' },
  { slot: 'Deletion', label: 'Delete Account' }
];

const currentNameCookie = useCookie('name');
const name = ref<string | null>(currentNameCookie.value);
const router = useRouter();

// Form variables
const emailForm = reactive({ currentEmail: '', newEmail: '', confirmedNewEmail: '' });
const nameForm = reactive({ newName: '' });
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmedNewPassword: '' });
const deletionForm = reactive({ email: '', password: '', confirmedPassword: '' });

// Error variables
const emailError = ref<string | null>(null);
const nameError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const deletionError = ref<string | null>(null);

async function onSubmitName() {
  console.log('Submitted form:', nameForm);

  try {
    const token = useCookie('token') ; // Ensure you're retrieving the correct token key
    console.log(token);
    const response = await $fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(nameForm),
    });
    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(errorText);
    // }
    console.log(response);
    currentNameCookie.value = nameForm.newName;

    // Clear the error message for the "Name" tab
    nameError.value = null;

    // Redirect to welcome page
    await router.push('/welcome');
  } catch (err: any) {
    console.error('An error occurred:', err.message);
    // Set the error message for the "Name" tab only
    nameError.value = err.message;
  }
}

async function onSubmitEmail() {
  console.log('Submitted form:', emailForm);

  try {
    const token = useCookie('token') ;

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(emailForm),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log('Response data:', data);

  

    // Clear the error message for the "Email" tab
    emailError.value = null;

    // Redirect to login page
    await router.push('/login');
  } catch (err: any) {
    emailError.value = err.message;
  }
}

async function onSubmitPassword() {
  console.log('Submitted form:', passwordForm);

  try {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordForm),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log('Response data:', data);

    

    // Clear the error message for the "Password" tab
    passwordError.value = null;

    // Redirect to login page
    await router.push('/login');
  } catch (err: any) {
    passwordError.value = err.message;
  }
}

async function onDeleteAccount() {
  try {
    const token = localStorage.getItem('token'); // Ensure you're retrieving the correct token key

    const response = await fetch('/api/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(deletionForm), // Ensure the body is included in the DELETE request
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log('Response data:', data);

    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    // Clear the error message for the "Delete Account" tab
    deletionError.value = null;

    await router.push('/login');
  } catch (err: any) {
    deletionError.value = err.message;
  }
}

</script>

