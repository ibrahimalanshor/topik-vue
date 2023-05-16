<script setup>
import { computed, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import ChatEmptyState from './chat-empty-state.vue';

const props = defineProps({
  chats: Object,
  topic: Object,
  query: Object,
});
const emit = defineEmits(['created', 'load-more']);

const chatWrapper = ref();
const reversedChats = computed(() => props.chats.data.toReversed());

function scrollToBottom() {
  chatWrapper.value.scrollTop =
    chatWrapper.value.scrollHeight - chatWrapper.value.clientHeight;
}

function handleScroll(e) {
  if (
    e.target.scrollTop === 0 &&
    props.chats.meta.count > 0 &&
    props.query.limit < props.chats.meta.count
  ) {
    emit('load-more');
  }
}
function handleCreated() {
  emit('created');
}

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div
    ref="chatWrapper"
    class="flex-grow max-h-screen overflow-y-auto py-4"
    v-on:scroll="handleScroll"
  >
    <chat-empty-state
      v-if="chats.meta.count < 1"
      :topic-id="topic.id"
      v-on:created="handleCreated"
    />
    <template v-else>
      <div
        v-for="chat in reversedChats"
        :key="chat"
        class="flex gap-x-4 hover:bg-gray-100 py-1 px-8"
      >
        <p class="flex-shrink-0 font-light text-gray-500">
          {{ dayjs(chat.created_at).format('HH:mm:ss') }}
        </p>
        <p class="inline text-gray-900">{{ chat.content }}</p>
      </div>
    </template>
  </div>
</template>
