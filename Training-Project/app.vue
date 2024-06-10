<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <!-- <nav>
        <nuxt-link v-if-"!isAuthenticated" to="/register">Register</nuxt-link>
        <nuxt-link v-if-"!isAuthenticated" to="/login">Login</nuxt-link>
      </nav> -->
      <NuxtPage />
  </NuxtLayout>
  </div>
</template>

<style>

nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-content: center ;
}

nav a {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

nav a:hover {
  background-color: #45a049;
}

</style>
