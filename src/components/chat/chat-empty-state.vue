<script setup>
import { reactive } from 'vue';
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline';
import { usePost } from '@/composes/http.compose';
import { useToastStore } from '@/store/modules/toast.store';
import { useString } from '@/composes/resource.compose';
import BaseInput from '@/components/base/base-input.vue';
import BaseButton from '@/components/base/base-button.vue';
import { postChat } from '@/api/chat.api';

const props = defineProps({
  topicId: [Number, String],
});
const emit = defineEmits(['created']);

const toastStore = useToastStore();
const { getString } = useString();
const { isLoading, error, post: storeChat } = usePost(postChat);

const form = reactive({
  content: null,
  topic_id: props.topicId,
});

function getFirstObjectValue(obj) {
  return obj[Object.keys(obj)[0]];
}

async function handleSubmit() {
  try {
    await storeChat(form);

    emit('created');
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
  <div
    class="mx-auto max-w-lg px-4 h-full flex items-center justify-center sm:px-6 lg:px-0"
  >
    <div>
      <div class="text-center">
        <chat-bubble-bottom-center-icon class="mx-auto h-8 w-8 text-gray-400" />
        <h2 class="mt-2 text-base font-semibold leading-6 text-gray-900">
          {{ getString('chat.label.start-chat-title') }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ getString('chat.label.start-chat-description') }}
        </p>
      </div>
      <form class="mt-6 flex gap-x-4" v-on:submit.prevent="handleSubmit">
        <base-input
          :placeholder="getString('chat.label.start-chat-placeholder')"
          v-model="form.content"
        />
        <base-button
          :disabled="isLoading"
          :loading="isLoading"
          color="black"
          :classes="{
            button: 'flex-shrink-0',
          }"
          >{{ getString('common.send') }}</base-button
        >
      </form>
    </div>
  </div>
</template>
