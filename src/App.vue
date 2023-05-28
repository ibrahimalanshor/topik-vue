<script setup>
import { useRoute } from 'vue-router';
import PartialToast from '@/components/partial/partial-toast.vue';

const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout || 'div'">
    <partial-toast />
    <router-view :key="route.path" />
  </component>
</template>
