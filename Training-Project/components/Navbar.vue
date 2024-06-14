<template>
    <nav>
      <ul>
        <li><a href="/welcome" @click.prevent="navigate('/')">Home</a></li>
        <li><a href="/settings" @click.prevent="navigate('/settings')">Settings</a></li>
        <li><a href="https://github.com/bioneos/training-project/tree/main" target="_blank">Repo</a></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const navigate = (path) => {
    router.push(path);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    router.push('/login');
  };
  </script>
  
  <style scoped>
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav li {
    display: inline;
    margin-right: 10px;
  }
  </style>
  