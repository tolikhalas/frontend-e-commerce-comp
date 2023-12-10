<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Global/CustomHeader.vue';
import Footer from './components/Global/CustomFooter.vue';
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <RouterView class="flex-none" />
    </div>
    <Footer />
  </main>
</template>
