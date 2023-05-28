import { defineStore } from 'pinia';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const isLoggedIn = ref(false);

  function login(value) {
    token.value = value;
    isLoggedIn.value = true;
  }
  function logout() {
    token.value = null;
    isLoggedIn.value = false;
  }
  function getDecoded() {
    return jwtDecode(token.value);
  }

  return { token, isLoggedIn, login, logout, getDecoded };
});
