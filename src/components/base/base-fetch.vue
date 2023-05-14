<script setup>
import { computed } from 'vue';
import BaseAlert from './base-alert.vue';
import BaseEmptyState from './base-empty-state.vue';
import BaseLoadingState from './base-loading-state.vue';

const props = defineProps({
  error: Object,
  visibleError: Boolean,
  count: Number,
  emptyText: {
    type: String,
    default: 'Empty',
  },
  errorDismissable: {
    type: Boolean,
    default: true,
  },
  withEmptyState: {
    type: Boolean,
    default: true,
  },
  withLoading: {
    type: Boolean,
    default: true,
  },
  withError: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:visibleError']);

const visibleErrorValue = computed({
  get: function () {
    return props.visibleError;
  },
  set: function (value) {
    emit('update:visibleError', value);
  },
});
</script>

<template>
  <slot name="loading" v-if="props.withLoading && props.loading">
    <base-loading-state />
  </slot>
  <template v-else>
    <slot name="error" v-if="props.withError && visibleErrorValue">
      <base-alert
        :message="props.error.message"
        color="red"
        size="sm"
        with-icon
        :dismissable="props.errorDismissable"
        v-model="visibleErrorValue"
      />
    </slot>
    <slot name="empty" v-if="props.withEmptyState && props.count < 1">
      <base-empty-state :text="props.emptyText" />
    </slot>
    <slot v-else />
  </template>
</template>
