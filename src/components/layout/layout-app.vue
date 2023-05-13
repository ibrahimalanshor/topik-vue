<script setup>
import PartialSidebar from '@/components/partial/sidebar/partial-sidebar.vue';
</script>

<template>
  <div class="flex">
    <partial-sidebar />

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
