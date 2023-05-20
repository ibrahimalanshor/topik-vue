<script setup>
import { reactive, inject } from 'vue';
import { useToastStore } from '@/store/modules/toast.store';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { postChat } from '@/api/chat.api';
import BaseInput from '@/components/base/base-input.vue';
import { getFirstObjectValue } from '@/common/utils/object.util';

const props = defineProps({
  topicId: [Number, String],
  autofocus: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['created']);

const emitter = inject('emitter');
const toastStore = useToastStore();
const { getString } = useString();
const { error, request: storeChat } = useRequest(postChat);

const form = reactive({
  content: null,
  topic_id: props.topicId,
});

function resetForm() {
  form.content = null;
}

async function handleSubmit() {
  try {
    const chat = await storeChat(form);
    resetForm();

    emit('created', chat);
    emitter.emit('chat-created');
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
    class="z-40 flex h-16 shrink-0 items-center gap-x-4 border-t border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
  >
    <form class="w-full" v-on:submit.prevent="handleSubmit">
      <base-input
        :bordered="false"
        :shadowed="false"
        :rounded="false"
        :autofocus="props.autofocus"
        custom-size="p-0"
        :placeholder="getString('chat.label.content-placeholder')"
        v-model="form.content"
      />
    </form>
  </div>
</template>
