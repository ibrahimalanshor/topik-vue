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

  function setData(value) {
    data.value = value;
  }

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

  return { data, error, isLoading, fetch, setData };
}

export function usePost(promiseOrUrl) {
  const { error, resetError } = useError();
  const { isLoading, startLoading, stopLoading } = useLoading();

  async function post(bodyOrPromise) {
    startLoading();
    resetError();

    try {
      return (
        typeof bodyOrPromise === 'function'
          ? await bodyOrPromise()
          : await promiseOrUrl(bodyOrPromise)
      ).data;
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

  return { error, isLoading, post };
}

export function useRequest(promise, options = {}) {
  const { initLoading = false, initResponse = {} } = options;

  const { error, resetError } = useError();
  const { isLoading, startLoading, stopLoading } = useLoading(initLoading);

  const res = ref(initResponse);

  function setRes(value) {
    res.value = value;
  }
  async function request(paramsOrPromise) {
    startLoading();
    resetError();

    try {
      const data = (
        typeof paramsOrPromise === 'function'
          ? await paramsOrPromise()
          : await promise(paramsOrPromise)
      ).data;

      res.value = data;

      return data;
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

  return { isLoading, error, res, request, setRes };
}
