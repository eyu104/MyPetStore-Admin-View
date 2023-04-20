import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../Layout/Layout.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
          component:()=>import('../views/OrderTable2.vue')
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
          path: '/productsTable',
          name: 'productsTable',
          component: () => import('../views/ProductsTable.vue')
        }
      ]

    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: Layout,
      children:[
        {
          path:'/login',
          name:'login',
          component: ()=>import('../views/Login.vue')
        }
      ]
    },

    {
      path: '/info',
      name: 'info',
      component: Layout,
      children:[
        {
          path:'/info',
          name:'info',
          component: ()=>import('../views/AccountInform.vue')
        }
      ]
    },

    {
      path: '/edit',
      name: 'edit',
      component: Layout,
      children:[
        {
          path:'/edit',
          name:'edit',
          component: ()=>import('../views/EditInfo.vue')
        }
      ]
    },

    {
      path: '/register',
      name: 'register',
      component: Layout,
      children:[
        {
          path: '/register',
          name: 'register',
          component: ()=>import('../views/Register.vue')
        }
      ]
    },
  ],
})
router.beforeEach(async (to, from) => {
  if (
      window.localStorage.getItem("token")===null && to.name !== 'login' && to.name !='register'
  ) {
    console.log(window.localStorage.getItem("token"))
    return '/login'

  }
})


export default router
