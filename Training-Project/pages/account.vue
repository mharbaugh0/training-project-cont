
<template>
    <div>
      <h1>This is the account page</h1>
      <UVerticalNavigation :links="links" />
    </div>
    <UHorizontalNavigation :links="accountOptions" class="border-b border-gray-200 dark:border-gray-800" />
  </template>
  
  <script setup lang="ts">
  definePageMeta({
        layout: 'default'
    })
  </script>
  



