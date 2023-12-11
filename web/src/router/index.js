import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useStore } from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/products/new',
      name: 'new product',
      component: () => import('../views/AddProductView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product page',
      component: () => import('../views/SingleProductView.vue'),
      props: (route) => ({ id: parseInt(route.params.id) || null }),
    },
    {
      path: '/products/:id/edit',
      name: 'edit product page',
      component: () => import('../views/SingleProductEditView.vue'),
      props: (route) => ({ id: parseInt(route.params.id) || null }),
    },
  ],
});

router.beforeEach(() => {
  const store = useStore();
  store.closeSidebar();
});

export default router;
