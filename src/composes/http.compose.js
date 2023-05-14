import { ref } from 'vue';
import { useLoading } from './loading.compose';
import { useError } from './error.compose';

export function useFetch(promiseOrUrl, options = {}) {
  const { error, resetError } = useError();
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  const data = ref(
    options.single
      ? null
      : {
          meta: {
            count: 0,
            limit: 10,
            offset: 10,
          },
          data: [],
        }
  );

  async function fetch(query) {
    startLoading();
    resetError();

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
    } finally {
      stopLoading();
    }
  }

  return { data, error, isLoading, fetch };
}

export function usePost(promiseOrUrl) {
  const { error } = useError();

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
