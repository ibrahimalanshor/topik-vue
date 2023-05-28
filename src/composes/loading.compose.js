import { ref } from 'vue';

export function useLoading(init = false) {
  const isLoading = ref(init);

  function startLoading() {
    isLoading.value = true;
  }
  function stopLoading() {
    isLoading.value = false;
  }

  return { isLoading, startLoading, stopLoading };
}
