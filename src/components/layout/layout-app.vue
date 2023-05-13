<script setup>
import PartialSidebar from '@/components/partial/sidebar/partial-sidebar.vue';
</script>

<template>
  <div class="flex">
    <div class="h-screen lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <partial-sidebar />
    </div>

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
