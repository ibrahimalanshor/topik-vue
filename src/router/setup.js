import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export function setupRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
}
