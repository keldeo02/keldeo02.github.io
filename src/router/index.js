import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // Hash history : fonctionne sur GitHub Pages sans configuration serveur.
  // À remplacer par createWebHistory() quand tu migres sur un vrai hébergeur.
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/admin',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin/dashboard',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !sessionStorage.getItem('admin_auth')) {
    return '/admin'
  }
})

export default router
