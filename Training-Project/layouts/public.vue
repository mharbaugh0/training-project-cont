<template>
  <div class="relative w-full max-w-6xl px-6 pt-6 mx-auto lg:px-16">
    <header class="relative w-full mx-auto space-y-4 md:flex md:items-center md:space-y-0 md:gap-x-4">
      <div class="flex items-center bg-gray-900 justify-between py-2 px-6 md:flex-1 rounded-card">
      <Logo />
            <nav class="hidden md:flex md:space-x-4 lg:space-x-6">
                <nuxt-link to="/register">Register</nuxt-link>
                <nuxt-link to="/login">Login</nuxt-link>
            </nav>
        </div>
    </header>
  </div>
    <div>
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
     </div>


  </template>




<style>
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-content: center;
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

header {
  padding: 20px;
}
</style>