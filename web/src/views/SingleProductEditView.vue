<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { Form, Field } from 'vee-validate';
import http from '@/api';
import { useRouter } from 'vue-router';

const product = ref(null);
const productId = ref(null);
const router = useRouter();

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

const onChange = async (values) => {
  const form = new FormData();
  form.append('_method', 'put');
  form.append('name', values['name']);
  form.append('brand', values['brand']);
  form.append('model_name', values['model name']);
  form.append('quantity', values['quantity']);
  form.append('image', values['image']);
  form.append('description', values['description']);

  await http.post(`/api/products/${productId.value}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  router.push('/products');
};

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
      <Form @submit="onChange">
        <figure class="rounded-t-xl lg:w-[600px]">
          <img :src="product.image" alt="product image" />
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
            <Field class="file-input" type="file" name="image" />
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
            <input type="submit" class="btn btn-secondary" value="save" />
            <RouterLink class="btn btn-accent" :to="`/products/${productId}`"
              >discard & back</RouterLink
            >
          </div>
        </div>
      </Form>
    </div>
    <div v-else>
      <h1 class="text-3xl">No such product</h1>
    </div>
  </section>
</template>
