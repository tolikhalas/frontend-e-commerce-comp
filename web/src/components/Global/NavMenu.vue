<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const navbar = ref([
  { name: 'Home', link: '/', icon: 'hi-home' },
  { name: 'Products', link: '/products', icon: 'bi-bag-check-fill' },
  { name: 'New Product', link: '/products/new', icon: 'io-add-circle-sharp' },
  { name: 'About', link: '/about', icon: 'bi-info-circle' },
]);
</script>

<template>
  <nav
    class="menu min-h-full w-80 gap-x-4 gap-y-4 bg-base-200 p-4 lg:menu-horizontal lg:w-auto lg:bg-inherit"
  >
    <h3 class="mb-4 text-lg lg:mb-0 lg:hidden">Raketka</h3>
    <RouterLink :to="link.link" v-for="(link, index) in navbar" :key="index">
      <span class="lg:hidden"><VIcon :name="link.icon" /></span> {{ link.name }}</RouterLink
    >
  </nav>
</template>
