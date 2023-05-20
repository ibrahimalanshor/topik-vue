<script setup>
import { computed } from 'vue';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import BaseModal from './base-modal.vue';
import BaseButton from './base-button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'success',
  },
  title: String,
  description: String,
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  actionText: {
    type: String,
    default: 'Confirm',
  },
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const icon = computed(() => {
  const icons = {
    success: CheckIcon,
    error: ExclamationTriangleIcon,
  };

  return icons[props.variant];
});
const actionColor = computed(() => {
  const colors = {
    success: 'black',
    error: 'red',
  };

  return colors[props.variant];
});
const style = computed(() => {
  const iconClass = {
    success: 'text-green-600',
    error: 'text-red-600',
  };
  const iconWrapperClass = {
    success: 'bg-green-100',
    error: 'bg-red-100',
  };

  return {
    icon: ['h-6 w-6', iconClass[props.variant]],
    iconWrapper: [
      'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
      iconWrapperClass[props.variant],
    ],
  };
});

function handleClose() {
  visible.value = false;
}
function handleConfirm() {
  emit('confirm');
}
</script>

<template>
  <base-modal :with-header="false" v-model="visible">
    <div>
      <div :class="style.iconWrapper">
        <component :is="icon" :class="style.icon" />
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          class="text-base font-semibold leading-6 text-gray-900"
          id="modal-title"
        >
          {{ props.title }}
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">{{ props.description }}</p>
        </div>
      </div>
    </div>
    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
    >
      <base-button type="button" v-on:click="handleClose">{{
        props.cancelText
      }}</base-button>
      <base-button
        type="button"
        :disabled="props.loading"
        :loading="props.loading"
        v-on:click="handleConfirm"
        :color="actionColor"
        >{{ props.actionText }}</base-button
      >
    </div>
  </base-modal>
</template>
