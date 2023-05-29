import { useRoute } from 'vue-router';
import { useString } from './resource.compose';

export function useTitle() {
  const route = useRoute();
  const { getString } = useString();

  function setTitleFromRoute() {
    document.title = getString(`pages.${route.meta.title}`);
  }

  return { setTitleFromRoute };
}
