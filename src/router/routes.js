export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index-page.vue'),
  },
  {
    path: '/topic',
    children: [
      {
        path: ':id',
        name: 'topic.detail',
        component: () => import('@/pages/topic/topic-detail-page.vue'),
      },
    ],
  },
];
