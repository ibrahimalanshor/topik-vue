<script setup>
import { useRoute } from 'vue-router';
import PartialToast from '@/components/partial/partial-toast.vue';

import { useRouter } from 'vue-router';
import { useTitle } from '@/composes/title.compose';

const router = useRouter();
const route = useRoute();
const { setTitleFromRoute } = useTitle();

router.afterEach(() => {
  setTitleFromRoute();
});
</script>

<template>
  <component :is="route.meta.layout || 'div'">
    <partial-toast />
    <router-view :key="route.path" />
  </component>
</template>
