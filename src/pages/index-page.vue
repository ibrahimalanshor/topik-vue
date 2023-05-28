<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { useToastStore } from '@/store/modules/toast.store';
import { postTopic } from '@/api/topic.api';
import { postChat } from '@/api/chat.api';
import { getFirstObjectValue } from '@/common/utils/object.util';
import ChatEmptyState from '@/components/chat/chat-empty-state.vue';

const props = defineProps({
  topicId: [Number, String],
});
const emit = defineEmits(['created']);

const emitter = inject('emitter');
const router = useRouter();
const { getString } = useString();
const toastStore = useToastStore();
const { error: errorStoreTopic, request: storeTopic } = useRequest(postTopic);
const { error: errorStoreChat, request: storeChat } = useRequest(postChat);
const isLoading = ref(false);

async function createTopic({ name }) {
  try {
    return await storeTopic({ name });
  } catch (err) {
    const message =
      errorStoreTopic.server && errorStoreTopic.errors.status === 422
        ? getFirstObjectValue(errorStoreTopic.errors.errors)
        : errorStoreTopic.message;

    toastStore.createToast({
      id: 'error-create-topic',
      message: message,
      color: 'red',
    });
  }
}
async function createChat({ content, topic_id }) {
  try {
    await storeChat({ content, topic_id });
  } catch (err) {
    const message =
      errorStoreChat.server && errorStoreChat.errors.status === 422
        ? getFirstObjectValue(errorStoreChat.errors.errors)
        : errorStoreTopic.message;

    toastStore.createToast({
      id: 'error-create-chat',
      message: message,
      color: 'red',
    });
  }
}
function validateForm(form) {
  if (!form.content) {
    throw new Error(getString('chat.label.content-empty-validation'));
  }
}

async function handleSubmit(form) {
  isLoading.value = true;

  try {
    validateForm(form);

    const topic = await createTopic({ name: form.content.slice(0, 20) });

    await createChat({ content: form.content, topic_id: topic.id });

    emitter.emit('topic-created');
    router.push({ name: 'topic.detail', params: { id: topic.id } });
  } catch (err) {
    toastStore.createToast({
      id: 'error-create-chat',
      message: err,
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-screen">
    <chat-empty-state :loading="isLoading" v-on:submit="handleSubmit" />
  </div>
</template>
