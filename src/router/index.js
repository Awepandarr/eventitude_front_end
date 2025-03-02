//Router to navigate to the pages
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/events/:id/category',
      name: 'category',
      component: () => import('../views/categoryView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
    },
    {
      path: '/events',
      name: 'Create-Event',
      component: () => import('../views/EventCreate.vue'),
    },
    {
      path: '/event/draft',
      name: 'Draft',
      component: () => import('../views/Draft_Event.vue'),
    },
    {
      path: '/events/:id',
      name: 'Get Event Details',
      component: () => import('../views/getDetails.vue'),
    },
    {
      path: '/event/update/:id',
      name: 'Update Details',
      component: () => import('../views/UpdateEvent.vue'),
    },
  ],
})

export default router
