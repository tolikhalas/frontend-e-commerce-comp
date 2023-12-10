<script setup>
import { ref, onMounted } from 'vue';
import http from '@/api';

const products = ref(null);
const imageURL = ref(null);

onMounted(async () => {
  const { data } = await http.get('/api/products');
  imageURL.value = `${http.defaults.baseURL}storage`;
  products.value = data?.products;
});
</script>

<template>
  <section class="m-4 grid gap-4">
    <div class="join w-full justify-self-center lg:w-8/12">
      <div class="w-full">
        <div class="w-full">
          <input class="input join-item input-bordered w-full" placeholder="Search" />
        </div>
      </div>
      <select class="join-item select select-bordered">
        <option disabled selected>Filter</option>
        <option>Phones</option>
        <option>Laptops</option>
        <option>Refrigirators</option>
      </select>
      <button class="btn btn-primary join-item">Search</button>
    </div>
    <div class="flex justify-center">
      <div class="grid gap-4 md:grid-cols-2 lg:w-8/12 lg:grid-cols-3">
        <div v-for="(product, index) in products" :key="index" class="card bg-base-300">
          <figure>
            <img
              class="h-[400px] w-full object-cover"
              :src="
                product.image ? `${imageURL}/${product.image}` : 'src/assets/img/placeholder.jpg'
              "
              alt="product image"
            />
          </figure>
          <div class="card-body grid gap-4">
            <h2 class="card-title">{{ product.name }}</h2>
            <div class="text-md">
              <p>Brand: {{ product.brand }}</p>
              <p>Model: {{ product.model_name }}</p>
            </div>
            <div class="card-actions flex justify-between gap-x-5">
              <button class="btn btn-secondary" :class="product.quantity > 0 ? '' : 'btn-disabled'">
                Add to cart <v-icon name="co-cart" />
              </button>
              <RouterLink class="btn btn-accent justify-self-end" :to="`/products/${product.id}`"
                >Details <v-icon name="bi-arrow-right-circle-fill"
              /></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
