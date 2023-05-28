<script setup>
import { computed, inject } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { deleteTopic } from '@/api/topic.api';
import { useToastStore } from '@/store/modules/toast.store';
import BaseConfirm from '@/components/base/base-confirm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  topic: Object,
});
const emit = defineEmits(['update:modelValue', 'success']);

const emitter = inject('emitter');
const { getString } = useString();
const toastStore = useToastStore();
const {
  isLoading,
  error,
  request: requestDeleteTopic,
} = useRequest(deleteTopic);

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});

async function handleConfirm() {
  try {
    await requestDeleteTopic(props.topic.id);

    visible.value = false;

    emit('success');
    emitter.emit('topic-deleted');
  } catch (err) {
    toastStore.createToast({
      id: 'error-delete-topic',
      message: error.message,
      color: 'red',
    });
  }
}
</script>

<template>
  <base-confirm
    variant="error"
    :title="getString('topic.label.delete')"
    :description="getString('topic.label.delete-description')"
    :loading="isLoading"
    v-model="visible"
    v-on:confirm="handleConfirm"
  />
</template>
