export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index-page.vue'),
    meta: {
      title: 'home',
      layout: 'layout-app',
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/auth-login-page.vue'),
    meta: {
      title: 'login',
      requireGuest: true,
    },
  },
  {
    path: '/topic',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: ':id',
        name: 'topic.detail',
        component: () => import('@/pages/topic/topic-detail-page.vue'),
        meta: {
          title: 'topic.detail',
          layout: 'layout-app',
        },
      },
    ],
  },
];
