import { createAuthGuard } from './auth.guard';

export function setupGuard(router) {
  createAuthGuard(router);
}
