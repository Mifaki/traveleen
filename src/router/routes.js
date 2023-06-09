
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'LandingPage', component: () => import('src/pages/LandingPage.vue') }
    ]
  },

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
    path: '/profile',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'Menu', component: () => import('src/pages/Menu.vue') }
    ]
  },


  {
    path: '/education',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'Education', component: () => import('src/pages/Education.vue') }
    ]
  },

  {
    path: '/catalog',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'Catalog', component: () => import('src/pages/Catalog.vue') }
    ]
  },

  {
    path: '/detail-:id',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'Detail', component: () => import('src/pages/Detail.vue') }
    ]
  },

  {
    path: '/checkout',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'Checkout', component: () => import('src/pages/Checkout.vue') }
    ]
  },

  {
    path: '/balance',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'Balance', component: () => import('src/pages/Balance.vue') }
    ]
  },

  {
    path: '/history',
    component: () => import('src/layouts/HeaderFooter.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', name:'History', component: () => import('src/pages/History.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
