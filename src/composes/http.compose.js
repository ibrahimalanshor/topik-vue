import { reactive, ref } from 'vue';

export function useFetch(promiseOrUrl, options = {}) {
  const data = ref(
    options.single
      ? null
      : {
          count: 0,
          data: [],
        }
  );
  const error = reactive({
    server: false,
    message: null,
    errors: null,
    value: false,
  });

  async function fetch(query) {
    try {
      data.value = (await promiseOrUrl(query)).data;
    } catch (err) {
      if (err.response) {
        error.server = true;
        error.errors = err.response.data;
      } else {
        error.server = false;
        error.errors = err;
      }

      error.message = 'Something Error';
      error.value = true;

      throw err;
    }
  }

  return { data, error, fetch };
}

export function usePost(promiseOrUrl) {
  const error = reactive({
    server: false,
    message: null,
    errors: null,
    value: false,
  });

  async function post(body) {
    try {
      await promiseOrUrl(body);
    } catch (err) {
      if (err.response) {
        error.server = true;
        error.errors = err.response.data;
      } else {
        error.server = false;
        error.errors = err;
      }

      error.message = 'Something Error';
      error.value = true;

      throw err;
    }
  }

  return { error, post };
}
