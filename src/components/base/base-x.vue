<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['click']);

function handleClick() {
  emit('click');
}
</script>

<template>
  <button
    type="button"
    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
    v-on:click="handleClick"
  >
    <x-mark-icon class="w-4 h-4" />
  </button>
</template>
