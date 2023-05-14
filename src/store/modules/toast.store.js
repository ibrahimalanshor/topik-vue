import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const max = 5;
  const toasts = ref([]);

  function createToast({ id, color, message, autoclose = true } = {}) {
    if (toasts.value.length >= max) {
      toasts.value.shift();
    }

    toasts.value.push({ id, color, message, visible: true });

    if (autoclose ?? true) {
      setTimeout(() => {
        const index = toasts.value.findIndex((toast) => toast.id === id);

        toasts.value.splice(index, 1);
      }, 3000);
    }
  }

  return { toasts, createToast };
});
