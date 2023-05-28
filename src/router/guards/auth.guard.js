import { useAuthStore } from '@/store/modules/auth.store';

function authGuard(to) {
  const authStore = useAuthStore();

  if (
    !authStore.isLoggedIn &&
    to.matched.some((route) => route.meta.requireAuth)
  ) {
    return { name: 'login' };
  }
}

export function createAuthGuard(router) {
  router.beforeEach(authGuard);
}
