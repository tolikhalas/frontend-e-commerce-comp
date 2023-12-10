<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import http from '@/api';

const formData = ref([
  {
    name: 'name',
    as: 'input',
    type: 'text',
    value: ref(''),
  },
  {
    name: 'brand',
    as: 'input',
    type: 'text',
    value: ref(''),
  },
  {
    name: 'model name',
    as: 'input',
    type: 'text',
    value: ref(''),
  },
  {
    name: 'quantity',
    as: 'input',
    type: 'number',
    value: ref(0),
  },
  {
    name: 'image',
    as: 'input',
    type: 'file',
    value: ref(null),
  },
  {
    name: 'description',
    as: 'textarea',
    value: ref(''),
  },
]);

const submitForm = (values) => {
  // Form submission logic
  const form = new FormData();
  form.append('name', values['name']);
  form.append('brand', values['brand']);
  form.append('model_name', values['model name']);
  form.append('quantity', values['quantity']);
  form.append('image', values['image']);
  form.append('description', values['description']);

  http.post('/api/products', form);
  // console.log(`Form submitted: ${JSON.stringify(values, null, 2)}`);
};
</script>

<template>
  <section class="flex flex-1 flex-col items-center justify-center gap-y-4 p-8">
    <h1 class="text-xl font-semibold">New product</h1>
    <div class="mx-auto max-w-2xl rounded bg-white p-8 shadow-lg">
      <Form @submit="submitForm" class="form-control grid gap-y-2">
        <template v-for="(field, index) in formData" :key="index">
          <label :for="field.name" class="mb-2 block text-sm font-bold text-gray-700">{{
            field.name
          }}</label>
          <Field
            :name="field.name"
            :type="field.type"
            class="w-full"
            :class="
              field.type === 'file'
                ? 'file-input file-input-bordered file-input-primary'
                : 'input input-bordered'
            "
            :as="field.as"
          />
          <ErrorMessage :name="field.name" />
        </template>

        <!-- Submit Button -->
        <div class="flex">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </Form>
    </div>
  </section>
</template>
