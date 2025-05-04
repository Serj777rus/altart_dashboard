import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Pages/LoginPage.vue'
import HomaPage from '@/views/Pages/HomaPage.vue'
import SettingsPage from '@/views/Pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: LoginPage,
    },
    {
      path: '/homepage',
      component: HomaPage,
      name: 'homepage',
    },
    {
      path: '/settings',
      component: SettingsPage,
      name: 'settings',
    }
  ],
})

export default router
