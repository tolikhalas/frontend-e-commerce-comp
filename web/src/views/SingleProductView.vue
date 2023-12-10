<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import http from '@/api';

const product = ref(null);
const productId = ref(null);

onMounted(async () => {
  const route = useRoute();
  productId.value = Number(route.params.id);
  try {
    const response = await http.get(`/api/products/${productId.value}`);
    if (response.status === 200) {
      const data = await response.data;
      product.value = data?.product;
      if (!product.value.image) {
        product.value.image = getImageUrl('placeholder.jpg');
      } else {
        product.value.image = `${http.defaults.baseURL}storage/${product.value.image}`;
      }
    }
  } catch (err) {}
});

const getImageUrl = (name) => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};
</script>

<template>
  <section class="grid w-full flex-1 flex-col items-center justify-center gap-y-4 p-8">
    <RouterLink class="btn btn-primary justify-self-start" to="/products"
      >Back to products</RouterLink
    >
    <div v-if="product" class="card border bg-base-200">
      <figure class="lg:w-[600px]">
        <img :src="product.image" alt="product image" />
      </figure>
      <div class="card-body">
        <h3 class="card-title">{{ product.name }}</h3>
        <div>
          <p><span class="font-semibold">Brand:</span> {{ product.brand }}</p>
          <p><span class="font-semibold">Model:</span> {{ product.model_name }}</p>
        </div>
        <p>Quantity: {{ product.quantity }}</p>
        <p>{{ product.description ?? 'No description provided' }}</p>
        <div class="card-actions">
          <button class="btn btn-secondary" :class="product.quantity > 0 ? '' : 'btn-disabled'">
            Add to cart <v-icon name="co-cart" />
          </button>
          <RouterLink class="btn btn-accent" :to="`/products/${productId}/edit`">Edit</RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-3xl">No such product</h1>
    </div>
  </section>
</template>
