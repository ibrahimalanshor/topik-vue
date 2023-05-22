<script setup>
import { reactive, ref } from 'vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { formatDate } from '@/common/utils/date.util';
import { useToastStore } from '@/store/modules/toast.store';
import { useRequest } from '@/composes/http.compose.js';
import { useString } from '@/composes/resource.compose';
import { patchChat } from '@/api/chat.api.js';
import BaseInput from '@/components/base/base-input.vue';
import ChatDeleteConfirm from './chat-delete-confirm.vue';

const props = defineProps({
  chat: Object,
});
const emit = defineEmits(['updated', 'deleted']);

const toastStore = useToastStore();
const { getString } = useString();
const { error, request: updateChat } = useRequest();

const editing = ref(false);
const deleteConfirmVisible = ref(false);
const form = reactive({
  content: props.chat.content,
});

function handleEdit() {
  form.content = props.chat.content;
  editing.value = true;
}
function handleCancelEdit() {
  editing.value = false;
}
async function handleSubmitEdit() {
  try {
    await updateChat(async () => await patchChat(props.chat.id, form));

    editing.value = false;
    emit('updated');
  } catch (err) {
    console.log(err);
    const message =
      error.server && error.errors.status === 422
        ? getFirstObjectValue(error.errors.errors)
        : error.message;

    toastStore.createToast({
      id: 'error-update-chat',
      message: message,
      color: 'red',
    });
  }
}
function handleDelete() {
  deleteConfirmVisible.value = true;
}
function handleDeleted() {
  emit('deleted');
}
</script>

<template>
  <div class="relative group flex gap-x-4 hover:bg-gray-100 py-1 px-8 relative">
    <p class="flex-shrink-0 font-light text-gray-500">
      {{ formatDate(props.chat.created_at, 'HH:mm:ss') }}
    </p>
    <template v-if="!editing">
      <p class="inline text-gray-900 break-all">{{ props.chat.content }}</p>
      <div
        class="absolute -top-4 right-8 z-10 hidden group-hover:block shadow rounded mt-1"
      >
        <button
          class="p-1 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-500 rounded-l"
          v-on:click="handleEdit"
        >
          <pencil-square-icon class="w-4 h-4" />
        </button>
        <button
          class="p-1 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-500 rounded-r"
          v-on:click="handleDelete"
        >
          <trash-icon class="w-4 h-4" />
        </button>
      </div>
    </template>
    <form
      v-else
      class="flex-grow space-y-2"
      v-on:submit.prevent="handleSubmitEdit"
    >
      <base-input
        with-message
        :message="getString('chat.label.edit-hint')"
        textarea
        autogrow
        prevent-submit
        v-model="form.content"
        v-on:esc="handleCancelEdit"
        v-on:blur="handleCancelEdit"
        v-on:submit="handleSubmitEdit"
      />
    </form>
    <chat-delete-confirm
      :chat="props.chat"
      v-model="deleteConfirmVisible"
      v-on:success="handleDeleted"
    />
  </div>
</template>
