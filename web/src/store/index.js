import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('mainStore', () => {
  const isSidebarOpen = ref(false)
  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  return { isSidebarOpen, closeSidebar }
})
