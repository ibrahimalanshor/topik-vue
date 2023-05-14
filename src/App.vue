<script setup>
import { useRoute } from 'vue-router';
import LayoutApp from '@/components/layout/layout-app.vue';

const route = useRoute();
</script>

<template>
  <layout-app>
    <router-view :key="route.path" />
  </layout-app>
</template>
