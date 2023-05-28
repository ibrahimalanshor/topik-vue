<script setup>
const props = defineProps({
  title: String,
  withHeader: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="rounded-lg bg-white shadow text-left">
    <div
      class="border-b border-gray-200 px-6 py-5"
      :class="{ 'flex items-center justify-between': $slots.action }"
      v-if="props.withHeader"
    >
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        {{ props.title }}
      </h3>
      <slot name="action" />
    </div>
    <div class="px-6 py-5">
      <slot />
    </div>
  </div>
</template>
