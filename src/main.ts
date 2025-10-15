import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import router from './router';
import i18n from './i18n';

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .use(i18n)
  .mount('#app');
