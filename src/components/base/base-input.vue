<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue';

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
  withMessage: {
    type: Boolean,
    default: false,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  preventSubmit: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      base: '',
    }),
  },
  message: String,
  rows: String,
});
const emit = defineEmits(['update:modelValue', 'esc', 'blur', 'submit']);

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
      props.classes.base,
      props.textLeading ? 'sm:leading-6' : '',
      props.shadowed ? 'shadow-sm' : '',
      props.rounded ? 'rounded-md' : '',
      props.bordered
        ? 'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset'
        : 'focus:outline-none focus:ring-0',
      props.customSize ?? 'py-1.5',
    ],
    message: 'mt-2 text-sm text-gray-500',
  };
});
const attributes = computed(() => ({
  class: [
    style.value.base,
    'block w-full border-0 text-gray-900 placeholder:text-gray-400 placeholder:text-sm text-sm overflow-hidden',
    props.autogrow ? 'resize-none' : '',
  ],
  placeholder: props.placeholder,
}));

function setAutofocus() {
  props.autofocus && input.value.focus();
}
function setHeight() {
  if (props.autogrow) {
    input.value.style.height = '16px';
    input.value.style.height = `${input.value.scrollHeight}px`;
  }
}
function handleEsc() {
  emit('esc');
}
function handleBlur() {
  emit('blur');
}
function handleEnter(e) {
  if (props.preventSubmit) {
    if (!e.shiftKey) {
      e.preventDefault();

      emit('submit');
    }
  }
}

watch(
  () => props.autofocus,
  () => {
    setAutofocus();
  }
);
watch(value, async () => {
  if (props.autogrow) {
    await nextTick();
    setHeight();
  }
});

onMounted(() => {
  setAutofocus();

  if (props.autogrow) {
    setHeight();
  }
});
</script>

<template>
  <div>
    <label
      v-if="props.withLabel"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ props.label }}</label
    >
    <div :class="{ 'mt-2': props.withLabel }">
      <textarea
        v-if="props.textarea"
        ref="input"
        :rows="rows"
        v-bind="attributes"
        v-model="value"
        v-on:keydown.esc="handleEsc"
        v-on:keydown.enter="handleEnter"
        v-on:blur="handleBlur"
      />
      <input
        v-else
        ref="input"
        type="text"
        v-bind="attributes"
        v-model="value"
        v-on:keydown.esc="handleEsc"
        v-on:keydown.enter="handleEnter"
        v-on:blur="handleBlur"
      />
      <slot v-if="props.withMessage" name="message" :classes="style">
        <p :class="style.message">
          {{ props.message }}
        </p>
      </slot>
    </div>
  </div>
</template>
