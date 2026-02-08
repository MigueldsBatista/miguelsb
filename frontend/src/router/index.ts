import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
    { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsPage.vue') },
    { path: '/projects/:id', name: 'project-details', component: () => import('@/views/ProjectDetailsPage.vue') }
  ]
});

export default router;
