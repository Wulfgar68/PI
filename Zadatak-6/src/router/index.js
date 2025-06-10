import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../components/SignUpView.vue'
import LogInView from '../components/LogInView.vue'
import UserView from '../components/UserView.vue'
import { useUserStore } from '../stores/userStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/signup', name: 'signup', component: SignUpView },
    { path: '/login', name: 'login', component: LogInView },
    { path: '/user', name: 'user', component: UserView, meta: { requiresAuth: true } },
  ]
})
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.currentUser) {
    next('/login')
  } else {
    next()
  }
})


export default router
