<template>
  <div class="mr-4">
  <UTabs :items="items" class="w-full"> 
    <template #Name="{ item }"> <!--Display Name settings form, Display Name tab-->
        <UCard @submit.prevent="onSubmitName" >
          <template #header>
            <p class="text-base font-semibold leading- text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Change your display name here. Click save when you're done to save your changes.
            </p>
          </template>

          <UFormGroup label="Display Name" name="newName" class="mb-3">
            <UInput v-model="nameForm.newName" :placeholder="storedName ?? ''" />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Save Name
            </UButton>
            <div v-if="nameError" style="color: red; font-weight: bold;">{{ nameError }}</div>
          </template>
        </UCard>
      </template>



    <template #Email="{ item }"> <!--Email settings form, Email tab-->
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

    
    
    <template #password="{ item }"> <!--Password settings form, Password tab-->
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

    <template #Deletion="{ item }"> <!--Deletion settings form, Deletion tab-->
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { consola } from "consola"

const items = [ {
  slot: 'Name',
  label: 'Display Name'
}, {
  slot: 'Email',
  label: 'Email'
}, {
  slot: 'password',
  label: 'Password'
}, {
  slot: 'Deletion',
  label: 'Delete Account'
}]

const name = ref<string | null>(null);
const router = useRouter();
const storedName = localStorage.getItem('name');

//Form variables
const nameForm = reactive({ newName: ''})
const emailForm = reactive({currentEmail: '', newEmail: '', confirmedNewEmail:'' })
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmedNewPassword: '' })
const deletionForm = reactive({ email: '', password: '', confirmedPassword: '' })

//Error variables
const emailError = ref<string | null>(null);
const nameError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const deletionError = ref<string | null>(null);

async function clearData() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
}

async function onSubmitName() {
  consola.log('Submitted form:', nameForm);

  try {
    const token = localStorage.getItem('token'); // Ensure you're retrieving the correct token key
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(nameForm),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    consola.info('Response data:', data);
    localStorage.setItem('name', data.newName); // Assuming data.newName holds the updated name

    // Clear the error message for the "Name" tab
    nameError.value = null;

    // Redirect to welcome page
    await router.push('/welcome');

  } catch (err: any) {
    consola.error('An error occurred:', err.message);
    // Set the error message for the "Name" tab only
    nameError.value = err.message;
  }
}

async function onSubmitEmail() {
  consola.log('Submitted form:', emailForm);

  try {
    const token = localStorage.getItem('id');

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
    consola.info('Response data:', data);

    // Clear user data from local storage
    clearData()

    // Clear the error message for the "Email" tab
    emailError.value = null;

    // Redirect to login page
    await router.push('/login');

  } catch (err: any) {
    emailError.value = err.message;
  }
}

async function onSubmitPassword() {
  consola.log('Submitted form:', passwordForm);

  try {
    const token = localStorage.getItem('id');

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
    consola.info('Response data:', data);

    // Clear user data from local storage
    clearData()

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
    const token = localStorage.getItem('id'); // Ensure you're retrieving the correct token key

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
    consola.info('Response data:', data);

    // Clear user data from local storage
    clearData()

    // Clear the error message for the "Delete Account" tab
    deletionError.value = null;

    await router.push('/login');
  } catch (err: any) {
    deletionError.value = err.message;
  }
}

//Check if the name is stored in local storage/ user is authenticated
onMounted(() => {

  // Check if this is the first visit after login
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    // Clear the flag to prevent future reloads
    localStorage.removeItem('firstLogin');
    
    // Reload the page - deprecated temporary fix for navigation styling issues
    //window.location.reload();
  }

  const storedName = localStorage.getItem('name');
  if (!storedName) {
    router.push('/login');
  } else {
    name.value = storedName;
  }
});
</script>

<style>

div {
  margin-left: 4px;
  margin-right: 4px;
}

[role=tab] {
  visibility: visible;
}

.dark\:bg-gray-900:is(.dark *) {
  background-color: transparent;
}

.dark\:bg-gray-900:is(.light *) {
  background-color: transparent;
}

*, ::before, ::after {
  box-sizing:inherit;
}

</style>