<script setup>
import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/20/solid';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
  dismissable: {
    type: Boolean,
    default: false,
  },
  forceVisible: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'blue',
  },
  size: {
    type: String,
    default: 'md',
  },
  message: String,
});
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const icon = computed(() => {
  const iconColors = {
    blue: CheckCircleIcon,
    red: XCircleIcon,
    yellow: ExclamationTriangleIcon,
  };

  return iconColors[props.color];
});
const style = computed(() => {
  const wrapperColors = {
    blue: 'bg-blue-50',
    red: 'bg-red-50',
    yellow: 'bg-yellow-50',
  };
  const iconColors = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
  };
  const messageColors = {
    blue: 'text-blue-700',
    red: 'text-red-800',
    yellow: 'text-yellow-800',
  };
  const dismissColors = {
    blue: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50',
    red: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
    yellow:
      'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
  };
  const wrapperSizes = {
    sm: 'p-2',
    md: 'p-4',
  };

  const wrapper = [wrapperColors[props.color], wrapperSizes[props.size]];
  const icon = [iconColors[props.color]];
  const message = [messageColors[props.color]];
  const dismiss = [dismissColors[props.color]];

  return { wrapper, icon, message, dismiss };
});

function handleDismiss() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="props.forceVisible || visible"
    class="rounded-md"
    :class="style.wrapper"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icon"
          v-if="props.withIcon"
          name="icon"
          class="h-5 w-5"
          :class="style.icon"
        />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium" :class="style.message">
          <slot>{{ props.message }}</slot>
        </p>
      </div>
      <div class="ml-auto pl-3" v-if="props.dismissable">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="style.dismiss"
            v-on:click="handleDismiss"
          >
            <x-mark-icon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
