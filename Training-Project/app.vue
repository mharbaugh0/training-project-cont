<template>
  <div>
    <nav>
      <nuxt-link to="/register">Register</nuxt-link>
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/">Index</nuxt-link>
    </nav>
    <NuxtPage />
  </div>
</template>


<style>

nav {
  display: flex;
  gap: 1rem;
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
