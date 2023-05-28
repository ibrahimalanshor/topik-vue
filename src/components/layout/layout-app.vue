<script>
import PartialSidebar from '@/components/partial/sidebar/partial-sidebar.vue';

export default {
  name: 'LayoutApp',
  components: { PartialSidebar },
};
</script>

<template>
  <div class="flex">
    <partial-sidebar />

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
