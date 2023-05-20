<script setup>
import { computed } from 'vue';
import BaseAlert from '@/components/base/base-alert.vue';
import { useToastStore } from '@/store/modules/toast.store';

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);
</script>

<template>
  <div
    class="fixed top-4 left-1/2 z-[60] min-w-[25%] -translate-x-1/2 space-y-2"
  >
    <base-alert
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :color="toast.color"
      with-icon
      dismissable
      v-model="toast.visible"
    />
  </div>
</template>
