import { createAuthGuard } from './auth.guard';
import { createGuestGuard } from './guest.guard';

export function setupGuard(router) {
  createAuthGuard(router);
  createGuestGuard(router);
}
