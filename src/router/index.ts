import { createRouter, createWebHistory } from 'vue-router'
import GeneralTab from '../views/GeneralTab.vue'
import ProductsTab from '../views/ProductsTab.vue'
import ExpensesTab from '../views/ExpensesTab.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/general',
      name: 'General',
      component: GeneralTab
    },
    {
      path: '/',
      name: 'products',
      component: ProductsTab
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesTab
    }
  ]
})

export default router
