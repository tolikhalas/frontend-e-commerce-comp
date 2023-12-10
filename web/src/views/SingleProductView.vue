<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import http from '@/api';

const product = ref(null);

onMounted(async () => {
  const route = useRoute();
  const productId = route.params.id;
  const { data } = await http.get(`/api/products/${productId}`);
  product.value = data?.product;
});
</script>

<template>
  <section class="flex flex-1 flex-col justify-center items-center p-8 gap-y-4 w-full">
    <div v-if="product" class="bg-base-200 rounded-lg p-8">
      <h1>{{ product.name }}</h1>
    </div>
  </section>
</template>
