

<template>
  <div>
  <UTabs :items="items" class="w-full"> 
    <template #Name="{ item }">
        <UCard @submit.prevent="onSubmitName">
          <template #header>
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
          <div v-if="error" style="color: red; font-weight: bold;">{{ error }}</div>
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
          
          <div v-if="error" style="color: red; font-weight: bold;">{{ error }}</div>        
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

const items = [ {
  slot: 'Name',
  label: 'Display Name'
}, {
  slot: 'Email',
  label: 'Email'
}, {
  slot: 'password',
  label: 'Password'
}]

const name = ref<string | null>(null);
const router = useRouter();
const error = ref<string | null>(null);
const storedName = localStorage.getItem('name');

const emailForm = reactive({currentEmail: '', newEmail: '', confirmedNewEmail:'' })
const nameForm = reactive({ newName: ''})
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmedNewPassword: '' })



async function onSubmitName() {
  console.log('Submitted form:', nameForm);
  try {
    const token = localStorage.getItem('token'); // Ensure you're retrieving the correct token key
    const response = await fetch('/api/auth/change-display-name', {
      method: 'POST',
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
    console.log('Response data:', data);
    localStorage.setItem('name', data.newName); // Assuming data.newName holds the updated name
    nameForm.newName = ''; // Reset the input field to be empty, showing the placeholder
  } catch (err: any) {
    console.error('An error occurred:', err.message);
    error.value = err.message;
  }
}


async function onSubmitEmail () {
  console.log('Submitted form:', emailForm);

  try {
    const token = localStorage.getItem('id');

    const response = await fetch('/api/auth/change-email', {
      method: 'POST',
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

    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    // Redirect to login page
    await router.push('/login');
  } catch (err: any) {
    // console.error('An error occurred:', error);
    error.value = err.message;
  }
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

    // Redirect to login page
    await router.push('/login');
  } catch (err: any) {
    // console.error('An error occurred:', error);
    error.value = err.message;
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

