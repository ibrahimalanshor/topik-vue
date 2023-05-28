<script setup>
import { useRequest } from '@/composes/http.compose';
import { useToastStore } from '@/store/modules/toast.store';
import { postChat } from '@/api/chat.api';
import { getFirstObjectValue } from '@/common/utils/object.util';
import ChatEmptyState from './chat-empty-state.vue';

const props = defineProps({
  topicId: [Number, String],
});
const emit = defineEmits(['created']);

const toastStore = useToastStore();
const { isLoading, error, request: storeChat } = useRequest(postChat);

async function handleSubmit(form) {
  try {
    const chat = await storeChat({
      ...form,
      topic_id: props.topicId,
    });

    emit('created', chat);
  } catch (err) {
    const message =
      error.server && error.errors.status === 422
        ? getFirstObjectValue(error.errors.errors)
        : error.message;

    toastStore.createToast({
      id: 'error-create-chat',
      message: message,
      color: 'red',
    });
  }
}
</script>

<template>
  <chat-empty-state :loading="isLoading" v-on:submit="handleSubmit" />
</template>
