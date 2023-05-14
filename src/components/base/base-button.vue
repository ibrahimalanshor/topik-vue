<script setup>
import { computed } from 'vue';

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
    default: true,
  },
});

const style = computed(() => {
  const colors = {
    white: 'bg-white text-gray-900 hover:bg-gray-50',
  };
  const sizes = {
    xs: 'rounded px-2 py-1 text-xs',
    sm: 'rounded px-2 py-1 text-sm',
    md: 'rounded-md px-2.5 py-1.5 text-sm',
    lg: 'rounded-md px-3 py-2 text-sm',
    xl: 'rounded-md px-3.5 py-2.5 text-sm',
  };
  return [
    'font-semibold',
    colors[props.color],
    sizes[props.size],
    props.shadowed ? 'shadow-sm' : '',
    props.bordered ? 'ring-1 ring-inset ring-gray-300' : '',
    props.block ? 'w-full' : '',
  ];
});
</script>

<template>
  <button type="button" :class="style">
    <slot />
  </button>
</template>
