import { createRouter, createWebHistory } from 'vue-router';

import JobsPage from '@/pages/JobsPage.vue';
import JobPage from '@/pages/JobPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';

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
      name: 'home-page',
      redirect: { name: 'jobs-page' },
    },
    {
      path: '/jobs',
      name: 'jobs-page',
      component: JobsPage,
    },
    {
      path: '/jobs/:id',
      name: 'job-page',
      component: JobPage,
    },
    {
      path: '/error',
      name: 'error-page',
      component: ErrorPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-page',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
