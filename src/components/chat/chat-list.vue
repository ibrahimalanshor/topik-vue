<script setup>
import { computed, ref, reactive, onMounted, inject } from 'vue';
import { isSameDay, formatDate } from '@/common/utils/date.util';
import BaseSpinner from '@/components/base/base-spinner.vue';
import BaseSeparator from '@/components/base/base-separator.vue';
import ChatEmptyState from './chat-empty-state.vue';
import ChatListItem from './chat-list-item.vue';

const props = defineProps({
  chats: Object,
  topic: Object,
  query: Object,
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['created', 'load-more']);

const emitter = inject('emitter');
const checkpoint = reactive({
  offsetTop: 0,
  scrollHeight: 0,
});
const reversedChats = computed(() => props.chats.data.toReversed());

function scrollToBottom() {
  const chatWrapper = document.querySelector('#chatWrapper');

  chatWrapper.scrollTop = chatWrapper.scrollHeight - chatWrapper.clientHeight;
}
function scrollToCheckpoint() {
  const chatWrapper = document.querySelector('#chatWrapper');
  const chatListWrapper = document.querySelector('#chatListWrapper');

  chatWrapper.scrollTop =
    chatWrapper.scrollHeight -
    checkpoint.scrollHeight +
    checkpoint.offsetTop -
    chatListWrapper.offsetTop;
}
function checkIsNewDayChat(index, chat) {
  return (
    index === 0 ||
    !isSameDay(chat.created_at, reversedChats.value[index - 1].created_at)
  );
}

function handleScroll(e) {
  if (
    e.target.scrollTop === 0 &&
    props.chats.meta.count > 0 &&
    props.query.limit < props.chats.meta.count
  ) {
    const chatWrapper = document.querySelector('#chatWrapper');
    const chatListWrapper = document.querySelector('#chatListWrapper');

    checkpoint.offsetTop = chatListWrapper.firstElementChild.offsetTop;
    checkpoint.scrollHeight = chatWrapper.scrollHeight;

    emit('load-more');
  }
}
function handleCreated(chat) {
  emit('created', chat);
}

emitter.on('chat-created-and-reloaded', () => {
  scrollToBottom();
});
emitter.on('chat-loaded-more', () => {
  scrollToCheckpoint();
});

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div
    id="chatWrapper"
    class="flex-grow max-h-screen overflow-y-auto py-4"
    v-on:scroll="handleScroll"
  >
    <chat-empty-state
      v-if="chats.meta.count < 1"
      :topic-id="topic.id"
      v-on:created="handleCreated"
    />
    <template v-else>
      <div v-if="props.loading" class="flex justify-center mb-4">
        <base-spinner color="gray" />
      </div>
      <div id="chatListWrapper">
        <template v-for="(chat, index) in reversedChats" :key="chat">
          <base-separator
            :class="[index === 0 ? 'mb-2' : 'my-2']"
            v-if="checkIsNewDayChat(index, chat)"
          >
            {{ formatDate(chat.created_at, 'DD MMMM YYYY') }}
          </base-separator>
          <chat-list-item :chat="chat" />
        </template>
      </div>
    </template>
  </div>
</template>
