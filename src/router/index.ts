import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: { title: 'Main View' },
    },
    {
      path: '/subnav1',
      name: 'subnav1',
      component: MainView,
      meta: { title: 'Sub Nav 1' },
    },
    {
      path: '/subnav2',
      name: 'subnav2',
      component: MainView,
      meta: { title: 'Sub Nav 2' },
    },
    {
      path: '/subnav3',
      name: 'subnav3',
      component: MainView,
      meta: { title: 'Sub Nav 3' },
    },
    {
      path: '/subnav4',
      name: 'subnav4',
      component: MainView,
      meta: { title: 'Sub Nav 4' },
    },
    {
      path: '/subnav5',
      name: 'subnav5',
      component: MainView,
      meta: { title: 'Sub Nav 5' },
    },
    {
      path: '/subnav6',
      name: 'subnav6',
      component: MainView,
      meta: { title: 'Sub Nav 6' },
    },
  ],
})

export default router
