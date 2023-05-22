<script setup>
import { computed } from 'vue';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
  size: {
    type: String,
    default: 'md',
  },
  shadowed: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      button: '',
    }),
  },
});
const emit = defineEmits(['click']);

const style = computed(() => {
  const colors = {
    white: 'bg-white text-gray-900 hover:bg-gray-50 ring-gray-300',
    black: 'bg-gray-900 text-white hover:bg-gray-800 ring-gray-900',
    red: 'bg-red-600 text-white hover:bg-red-500 ring-red-600',
  };
  const sizes = {
    xs: 'rounded px-2 py-1 text-xs',
    sm: 'rounded px-2 py-1 text-sm',
    md: 'rounded-md px-2.5 py-1.5 text-sm',
    lg: 'rounded-md px-3 py-2 text-sm',
    xl: 'rounded-md px-3.5 py-2.5 text-sm',
  };
  return [
    props.classes.button,
    'font-semibold flex items-center justify-center gap-x-2',
    colors[props.color],
    sizes[props.size],
    props.shadowed ? 'shadow-sm' : '',
    props.bordered ? 'ring-1 ring-inset' : '',
    props.block ? 'w-full' : '',
    props.disabled ? 'opacity-50' : '',
  ];
});

function handleClick() {
  emit('click');
}
</script>

<template>
  <button
    type="button"
    :class="style"
    :disabled="props.disabled"
    v-on:click="handleClick"
  >
    <base-spinner v-if="props.loading" size="sm" color="gray" />
    <slot />
  </button>
</template>
