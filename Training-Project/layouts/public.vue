<template>
    <header>
        <div>
          <Logo />
        <ClientOnly>
            <nav>
                <nuxt-link to="/register">Register</nuxt-link>
                <nuxt-link to="/login">Login</nuxt-link>
            </nav>
        </ClientOnly>
        <NuxtPage />
        </div>
    </header>
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