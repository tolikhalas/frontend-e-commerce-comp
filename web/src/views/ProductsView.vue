<script setup>
import { ref, onMounted } from 'vue';
import http from '@/api';

const products = ref(null);
const imageURL = ref(null);

onMounted(async () => {
  const { data } = await http.get('/api/products');
  imageURL.value = http.defaults.baseURL;
  products.value = data?.products;
});
</script>

<template>
  <section class="grid gap-4 m-4">
    <div class="join justify-self-center md:w-8/12">
      <div class="w-full">
        <div class="w-full">
          <input class="input w-full input-bordered join-item" placeholder="Search" />
        </div>
      </div>
      <select class="select select-bordered join-item">
        <option disabled selected>Filter</option>
        <option>Sci-fi</option>
        <option>Drama</option>
        <option>Action</option>
      </select>
      <button class="btn join-item btn-primary">Search</button>
    </div>
    <div class="flex justify-center">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:w-8/12">
        <div v-for="(product, index) in products" :key="index" class="card bg-base-300">
          <figure>
            <img
              class="h-[400px] object-cover w-full"
              :src="
                product.image
                  ? `${imageURL}storage/${product.image}`
                  : 'src/assets/img/placeholder.jpg'
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
                Add to cart <VIcon name="co-cart" />
              </button>
              <RouterLink class="btn btn-accent justify-self-end" to=""
                >Details <VIcon name="bi-arrow-right-circle-fill"
              /></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
