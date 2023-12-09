<script setup>
import { RouterLink } from 'vue-router'
import { useStore } from '@/store';
import CustomFooter from './CustomFooter.vue';
const store = useStore()
</script>

<template>
    <div class="drawer flex-1 min-h-screen">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" v-model="store.isSidebarOpen" />
      <div class="drawer-content flex flex-col">
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="flex-1 px-2 mx-2"><RouterLink to="/">Raketka</RouterLink></div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-lg gap-x-4 menu-horizontal">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/products">Products</RouterLink>
              <RouterLink to="/about">About</RouterLink>
            </ul>
          </div>
        </div>
        <section class="flex flex-col flex-1">
          <div class="flex-1">
            <slot></slot>
          </div>
          <CustomFooter />
        </section>

      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu menu-lg gap-y-4 p-4 w-80 min-h-full bg-base-200">
          <RouterLink to="/"><VIcon name="hi-home" /> Home</RouterLink>
          <RouterLink to="/products"><VIcon name="bi-bag-check-fill" /> Products</RouterLink>
          <RouterLink to="/about"><VIcon name="bi-info-circle" /> About</RouterLink>
        </ul>
      </div>
    </div>
</template>
