export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index-page.vue'),
    meta: {
      layout: 'layout-app',
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/auth-login-page.vue'),
    meta: {
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
          layout: 'layout-app',
        },
      },
    ],
  },
];
