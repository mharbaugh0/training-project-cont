<template>
    <nav>
      <ul>
        <li><a href="/" @click.prevent="navigate('/')">Home</a></li>
        <li><a href="/welcome" @click.prevent="navigate('/welcome')">Welcome</a></li>
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
  