import './assets/styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';

// Icons
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { GiHamburgerMenu } from 'oh-vue-icons/icons';
import { HiHome, BiBagCheckFill, BiInfoCircle } from 'oh-vue-icons/icons';
import { BiArrowRightCircleFill, CoCart, IoAddCircleSharp } from 'oh-vue-icons/icons';

// Router
import router from './router';

// Store
import { createPinia } from 'pinia';

// Validation
import '@/validation';

// Adding Icons
addIcons(GiHamburgerMenu);
addIcons(HiHome, BiBagCheckFill, BiInfoCircle);
addIcons(BiArrowRightCircleFill, CoCart, IoAddCircleSharp);

const app = createApp(App);
app.component('VIcon', OhVueIcon);

app.use(router);
app.use(createPinia());

app.mount('#app');
