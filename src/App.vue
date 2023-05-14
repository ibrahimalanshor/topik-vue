<script setup>
import { useRoute } from 'vue-router';
import LayoutApp from '@/components/layout/layout-app.vue';
import PartialToast from '@/components/partial/partial-toast.vue';

const route = useRoute();
</script>

<template>
  <layout-app>
    <partial-toast />
    <router-view :key="route.path" />
  </layout-app>
</template>
