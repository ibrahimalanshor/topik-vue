import { reactive } from 'vue';

export function useError() {
  const error = reactive({
    server: false,
    message: null,
    errors: null,
    value: false,
  });

  function resetError() {
    error.server = false;
    error.message = null;
    error.errors = null;
    error.value = false;
  }

  return { error, resetError };
}
