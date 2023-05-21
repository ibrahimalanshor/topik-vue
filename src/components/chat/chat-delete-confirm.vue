<script setup>
import { computed } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { deleteChat } from '@/api/chat.api';
import { useToastStore } from '@/store/modules/toast.store';
import BaseConfirm from '@/components/base/base-confirm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  chat: Object,
});
const emit = defineEmits(['update:modelValue', 'success']);

const { getString } = useString();
const toastStore = useToastStore();
const { isLoading, error, request: requestDeleteChat } = useRequest(deleteChat);

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
    await requestDeleteChat(props.chat.id);

    visible.value = false;

    emit('success');
  } catch (err) {
    toastStore.createToast({
      id: 'error-delete-chat',
      message: error.message,
      color: 'red',
    });
  }
}
</script>

<template>
  <base-confirm
    variant="error"
    :title="getString('chat.label.delete')"
    :description="getString('chat.label.delete-description')"
    :loading="isLoading"
    v-model="visible"
    v-on:confirm="handleConfirm"
  />
</template>
