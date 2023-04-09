
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'LandingPage', component: () => import('src/pages/LandingPage.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      { path: '', name:'Login', component: () => import('src/pages/auth/Login.vue') }
    ]
  },

  {
    path: '/register',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      { path: '', name:'Register', component: () => import('src/pages/auth/Register.vue') }
    ]
  },

  {
    path: '/catalog',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'Catalog', component: () => import('src/pages/Catalog.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
