<script setup>
import { RouterView } from 'vue-router'
import PageWrapper from './components/Global/PageWrapper.vue'
</script>

<template>
    <PageWrapper class="flex-1">
      <RouterView />
    </PageWrapper>
</template>
