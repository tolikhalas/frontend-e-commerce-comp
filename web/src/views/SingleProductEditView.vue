<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
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

const validationRules = {
  name: 'required|min:3',
  brand: 'required|min:2',
  'model name': 'required|min:3',
  quantity: 'required|numeric|min_value:0',
  image: 'mimes:png,jpeg,jpg,gif',
  description: 'min:5',
};

const onChange = async (values) => {
  const form = new FormData();
  form.append('_method', 'put');
  form.append('name', values['name']);
  form.append('brand', values['brand']);
  form.append('model_name', values['model name']);
  form.append('quantity', values['quantity']);
  if (values['image']) {
    form.append('image', values['image']);
  }
  form.append('description', values['description']);

  await http.post(`/api/products/${productId.value}`, form);

  router.push('/products');
};

const onDelete = async () => {
  try {
    await http.delete(`/api/products/${productId.value}`);
    router.push('/products');
  } catch (err) {}
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
      <Form @submit="onChange" :validation-schema="validationRules">
        <figure class="rounded-t-xl lg:w-[600px]">
          <img :src="product.image" alt="product image" />
        </figure>
        <div class="card-body">
          <div class="flex flex-col">
            <label for="name">Product's name</label>
            <Field class="input" name="name" v-model="product.name" />
            <ErrorMessage name="name" class="error" />
          </div>
          <div class="flex flex-col">
            <label for="brand">Product's brand</label>
            <Field class="input" name="brand" v-model="product.brand" />
            <ErrorMessage name="brand" class="error" />
          </div>
          <div class="flex flex-col">
            <label for="model name">Product's model name</label>
            <Field class="input" name="model name" v-model="product.model_name" />
            <ErrorMessage name="model name" class="error" />
          </div>
          <div class="flex flex-col">
            <label for="image">Product's photo</label>
            <Field class="file-input" type="file" name="image" />
            <ErrorMessage name="image" class="error" />
          </div>
          <div class="flex flex-col">
            <label for="quantity">Product's quantity</label>
            <Field class="input" type="number" name="quantity" v-model="product.quantity" />
            <ErrorMessage name="quantity" class="error" />
          </div>
          <div class="flex flex-col">
            <label for="description">Product's description</label>
            <Field
              class="textarea"
              as="textarea"
              rows="5"
              name="description"
              v-model="product.description"
            />
            <ErrorMessage name="description" class="error" />
          </div>
          <div class="card-actions flex justify-between">
            <div class="flex gap-x-4">
              <input type="submit" class="btn btn-secondary" value="save" />
              <RouterLink class="btn btn-accent" :to="`/products/${productId}`"
                >discard & back</RouterLink
              >
            </div>
          </div>
        </div>
      </Form>
      <div class="card-body">
        <button class="btn btn-error" @click="onDelete">Delete the product</button>
      </div>
    </div>
    <div v-else>
      <h1 class="text-3xl">No such product</h1>
    </div>
  </section>
</template>
