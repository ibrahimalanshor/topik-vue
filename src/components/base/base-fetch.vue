<script setup>
import { computed } from 'vue';
import BaseAlert from './base-alert.vue';
import BaseEmptyState from './base-empty-state.vue';

const props = defineProps({
  error: Object,
  visibleError: Boolean,
  count: Number,
  emptyText: {
    type: String,
    default: 'Empty',
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
  <base-alert
    :message="props.error.message"
    color="red"
    size="sm"
    with-icon
    dismissable
    v-model="visibleErrorValue"
  />
  <template v-if="!visibleErrorValue">
    <slot name="empty" v-if="props.count < 1">
      <base-empty-state :text="props.emptyText" />
    </slot>
    <slot v-else />
  </template>
</template>
