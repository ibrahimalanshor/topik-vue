import { useAuthStore } from '@/store/modules/auth.store';

function guestGuard(to) {
  const authStore = useAuthStore();

  if (
    authStore.isLoggedIn &&
    to.matched.some((route) => route.meta.requireGuest)
  ) {
    return { name: 'index' };
  }
}

export function createGuestGuard(router) {
  router.beforeEach(guestGuard);
}
