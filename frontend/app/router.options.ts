import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: _routes => [
    {
      name: 'index',
      path: '/',
      component: () => import('~/views/HomePage.vue')
    },
    {
      name: 'projects',
      path: '/projects',
      component: () => import('~/views/ProjectsPage.vue')
    },
    {
      name: 'project-details',
      path: '/projects/:id',
      component: () => import('~/views/ProjectDetailsPage.vue')
    }]
};
