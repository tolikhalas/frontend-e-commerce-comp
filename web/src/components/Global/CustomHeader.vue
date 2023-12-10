<script setup>
import { RouterLink } from 'vue-router';
import { useStore } from '@/store';
import NavMenu from './NavMenu.vue';
const store = useStore();
</script>

<template>
  <div class="drawer flex-1">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" v-model="store.isSidebarOpen" />
    <div class="drawer-content flex flex-col">
      <div class="navbar w-full bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <v-icon name="gi-hamburger-menu" />
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">
          <RouterLink to="/">Raketka</RouterLink>
        </div>
        <div class="hidden flex-none lg:block">
          <NavMenu />
        </div>
      </div>
    </div>
    <div class="drawer-side z-[999]">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <NavMenu />
    </div>
  </div>
</template>
