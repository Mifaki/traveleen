
const routes = [
  {
    path: '/home',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'HomePage', component: () => import('src/pages/HomePage.vue') }
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
  {
    path: '/:id',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'Detail', component: () => import('src/pages/Detail.vue') }
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
