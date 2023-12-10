<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

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
    name: 'quanity',
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

const submitForm = () => {
  // Form submission logic
  console.log('Form submitted:');
};
</script>

<template>
  <section class="flex flex-1 flex-col justify-center items-center p-8 gap-y-4">
    <h1 class="font-semibold text-xl">New product</h1>
    <div class="max-w-2xl mx-auto p-8 bg-white rounded shadow-lg">
      <Form @submit="submitForm" class="grid gap-y-2 form-control">
        <template v-for="(field, index) in formData" :key="index">
          <label :for="field.name" class="block text-gray-700 text-sm font-bold mb-2">{{
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
