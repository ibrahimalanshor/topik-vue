<script setup>
import PartialLayoutSidebar from '@/components/partial/layout/partial-layout-sidebar.vue';
</script>

<template>
  <div class="flex">
    <div class="h-screen lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <partial-layout-sidebar />
    </div>

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
