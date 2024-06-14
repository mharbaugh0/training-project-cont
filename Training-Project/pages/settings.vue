<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
const passwordForm = reactive({ currentPassword: '', newPassword: '' })


function onSubmitAccount () {
  console.log('Submitted form:', accountForm)
}

function onSubmitPassword () {
  console.log('Submitted form:', passwordForm)
}


</script>

<template>
  <div>
  <UTabs :items="items" class="w-full">
    <template #account="{ item }">
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
        <UFormGroup label="Email" name="email">
          <UInput v-model="accountForm.email" />
        </UFormGroup>

        <template #footer>
          <UButton type="submit" color="black">
            Save account
          </UButton>
        </template>
      </UCard>
      
    </template>
    

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

        <UFormGroup label="Current Password" name="current" required class="mb-3">
          <UInput v-model="passwordForm.currentPassword" type="password" required />
        </UFormGroup>
        <UFormGroup label="New Password" name="new" required>
          <UInput v-model="passwordForm.newPassword" type="password" required />
        </UFormGroup>

        <template #footer>
          <UButton type="submit" color="black">
            Save password
          </UButton>
        </template>
      </UCard>
    </template>
  </UTabs>
</div>
</template>


  



