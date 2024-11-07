import { mockRoutes } from '../mock'; // 引入 mock.js

const routes = [
  {
    path: '/',
    name: 'Home',
    title : '首页',
    meta: { title: '首页' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { title: 'IndexPage' }, name: 'IndexPage', children : [] },
      ...mockRoutes.map(route => ({
        path: route.path,
        name: route.name,
        title: route.title,
        meta: route.meta,
        component: route.component,
        children: route.children ? route.children : [] // 确保有 children 属性
      }))
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
