<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: null,
  textLeading: {
    type: Boolean,
    default: true,
  },
  shadowed: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const style = computed(() => {
  return {
    base: [
      props.textLeading ? 'sm:leading-6' : '',
      props.shadowed ? 'shadow-sm' : '',
      props.bordered
        ? 'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        : 'focus:outline-none focus:ring-0',
    ],
  };
});
</script>

<template>
  <input
    type="text"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 placeholder:text-sm text-sm"
    :class="style.base"
    :placeholder="props.placeholder"
    v-model="value"
  />
</template>
