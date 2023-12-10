<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { Form, Field } from 'vee-validate';
import http from '@/api';

const product = ref(null);
const imageURL = ref(null);
const productId = ref(null);

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
      <Form>
        <figure class="rounded-t-xl lg:w-[600px]">
          <!-- FIXME: Placeholder image doesn't appear. Suggest that's internal bag -->
          <img :src="imageURL ?? 'src/assets/img/placeholder.jpg'" alt="product image" />
        </figure>
        <div class="card-body">
          <div class="flex flex-col">
            <label for="name">Product's name</label>
            <Field class="input" name="name" v-model="product.name" />
          </div>
          <div class="flex flex-col">
            <label for="name">Product's brand</label>
            <Field class="input" name="brand" v-model="product.brand" />
          </div>
          <div class="flex flex-col">
            <label for="name">Product's model name</label>
            <Field class="input" name="model_name" v-model="product.model_name" />
          </div>
          <div class="flex flex-col">
            <label for="name">Product's photo</label>
            <Field class="file-input" type="file" name="model_name" />
          </div>
          <div class="flex flex-col">
            <label for="name">Product's quantity</label>
            <Field class="input" type="number" name="quantity" v-model="product.quantity" />
          </div>
          <div class="flex flex-col">
            <label for="name">Product's description</label>
            <Field
              class="textarea"
              as="textarea"
              rows="5"
              name="description"
              v-model="product.description"
            />
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary">save</button>
            <RouterLink class="btn btn-accent" :to="`/products/${productId}`"
              >discard & back</RouterLink
            >
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>
