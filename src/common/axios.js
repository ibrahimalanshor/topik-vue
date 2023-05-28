import axios from 'axios';
import { router } from '@/router/router';
import { useAuthStore } from '@/store/modules/auth.store';
import { isLowerThanNow } from '@/common/utils/date.util';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();

  if (
    !authStore.isLoggedIn ||
    isLowerThanNow(authStore.getDecoded().exp * 1000)
  ) {
    authStore.logout();
    router.push({ name: 'login' });
  }

  config.headers['Authorization'] = authStore.token;

  return config;
});

export default http;
