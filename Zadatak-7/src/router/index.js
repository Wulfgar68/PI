import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../components/SignUpView.vue'
import LogInView from '../components/LogInView.vue'
import UserView from '../components/UserView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  onAuthStateChanged(auth, user => {
    if (requiresAuth && !user) {
      next('/login')
    } else {
      next()
    }
  })
})

export default router
