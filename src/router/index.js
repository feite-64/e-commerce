import { createRouter, createWebHashHistory } from 'vue-router'
// 同步加载
// import HomeView from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
// import Register from '../views/register/Register.vue'
// import Shop from '../views/shop/Shop.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    // 异步加载
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  },
  {
    path: '/order-confirmation/:shopId',
    name: 'OrderConfirmation',
    component: () => import('../views/shop/OrderConfirmation.vue')
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => import('../views/shop/OrderList.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    // 访问login页面之前执行
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// to 跳到哪里去
// from 从哪里跳过来
// next 继续执行
router.beforeEach((to, from, next) => {
  if (
    localStorage.isLogin === 'true' ||
    to.name === 'Login' ||
    to.name === 'Register'
  ) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
