
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name:'LandingPage', component: () => import('src/pages/LandingPage.vue') }
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
