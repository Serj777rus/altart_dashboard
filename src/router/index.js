import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: LoginPage,
    },
  ],
})

export default router
