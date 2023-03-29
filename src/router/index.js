import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../Layout/Layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect:"/home",
      children:[
        {
          path:'home',
          name:'home',
          component:()=>import('../views/HomeView.vue')
        }
      ]
    },

    {
      path: '/accountTable',
      name: 'accountTable',
      component: Layout,
      children:[
        {
          path:'/accountTable',
          name:'accountTable',
          component:()=>import('../views/AccountTable.vue')
        }
      ]
    },

    {
      path: '/orderTable',
      name: 'orderTable',
      component: Layout,
      children:[
        {
          path:'/orderTable',
          name:'orderTable',
          component:()=>import('../views/OrderTable.vue')
        }
      ]
    },

    {
      path: '/productsTable',
      name: 'productsTable',
      component: Layout,
      children:[
        {
          path:'/productsTable',
          name:'productsTable',
          component:()=>import('../views/ProductsTable.vue')
        }
      ]
    },

  ],
})
router.beforeEach((to,from)=>
{

})

export default router
