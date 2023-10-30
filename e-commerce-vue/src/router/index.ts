import { createRouter, createWebHistory } from 'vue-router'
import main from './routes/main'
import auth from './routes/auth'
import admin from './routes/admin'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...main,
    ...auth,
    ...admin
  ]
})

export default router
