import { createRouter, createWebHistory } from 'vue-router';

import JobsPage from '../pages/JobsPage.vue';
import JobPage from '../pages/JobPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'jobs-page',
      component: JobsPage,
    },
    {
      path: '/:id',
      name: 'job-page',
      component: JobPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-page',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
