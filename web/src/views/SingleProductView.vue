<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import http from '@/api';

const product = ref(null);
const productId = ref(null);
const imageURL = ref(null);

onMounted(async () => {
  const route = useRoute();
  productId.value = route.params.id;
  const { data } = await http.get(`/api/products/${productId.value}`);
  product.value = data?.product;
  if (product.value.image) {
    imageURL.value = `${http.defaults.baseURL}storage/${product.value.image}`;
  }
});
</script>

<template>
  <section class="grid w-full flex-1 flex-col items-center justify-center gap-y-4 p-8">
    <RouterLink class="btn btn-primary justify-self-start" to="/products"
      >Back to products</RouterLink
    >
    <div v-if="product" class="card border bg-base-200">
      <figure class="lg:w-[600px]">
        <!-- FIXME: Placeholder image doesn't appear. Suggest that's internal bag -->
        <img :src="imageURL ?? 'src/assets/img/placeholder.jpg'" alt="product image" />
      </figure>
      <div class="card-body">
        <h3 class="card-title">{{ product.name }}</h3>
        <div class="flex gap-x-2">
          <span class="font-semibold">{{ product.brand }}</span>
          <span>{{ product.model_name }}</span>
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
  </section>
</template>
