<script setup>
import { computed, ref, onMounted, watch } from 'vue';

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
  rounded: {
    type: Boolean,
    default: true,
  },
  autofocus: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: 'black',
  },
  placeholder: String,
  customSize: String,
  label: String,
  withLabel: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const input = ref();
const value = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const style = computed(() => {
  const colors = {
    black: 'focus:ring-gray-900',
  };

  return {
    base: [
      colors[props.color],
      props.textLeading ? 'sm:leading-6' : '',
      props.shadowed ? 'shadow-sm' : '',
      props.rounded ? 'rounded-md' : '',
      props.bordered
        ? 'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset'
        : 'focus:outline-none focus:ring-0',
      props.customSize ?? 'py-1.5',
    ],
  };
});

function setAutofocus() {
  props.autofocus && input.value.focus();
}

onMounted(() => {
  setAutofocus();
});

watch(
  () => props.autofocus,
  () => {
    setAutofocus();
  }
);
</script>

<template>
  <div>
    <label
      v-if="props.withLabel"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ props.label }}</label
    >
    <div :class="{ 'mt-2': props.withLabel }">
      <input
        ref="input"
        type="text"
        class="block w-full border-0 text-gray-900 placeholder:text-gray-400 placeholder:text-sm text-sm"
        :class="style.base"
        :placeholder="props.placeholder"
        v-model="value"
      />
    </div>
  </div>
</template>
