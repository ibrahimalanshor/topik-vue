<script setup>
import { computed, ref, reactive, onMounted, inject } from 'vue';
import dayjs from 'dayjs';
import BaseSpinner from '@/components/base/base-spinner.vue';
import ChatEmptyState from './chat-empty-state.vue';

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
const chatWrapper = ref();
const chatListWrapper = ref();
const checkpoint = reactive({
  offsetTop: 0,
  scrollHeight: 0,
});
const reversedChats = computed(() => props.chats.data.toReversed());

function scrollToBottom() {
  chatWrapper.value.scrollTop =
    chatWrapper.value.scrollHeight - chatWrapper.value.clientHeight;
}
function scrollToTopCheckpoint() {
  chatWrapper.value.scrollTop =
    chatWrapper.value.scrollHeight -
    checkpoint.scrollHeight +
    checkpoint.offsetTop -
    chatListWrapper.value.offsetTop;
}

function handleScroll(e) {
  if (
    e.target.scrollTop === 0 &&
    props.chats.meta.count > 0 &&
    props.query.limit < props.chats.meta.count
  ) {
    checkpoint.offsetTop = chatListWrapper.value.firstElementChild.offsetTop;
    checkpoint.scrollHeight = chatWrapper.value.scrollHeight;

    emit('load-more');
  }
}
function handleCreated() {
  emit('created');
}

emitter.on('chat-created-and-reloaded', () => {
  scrollToBottom();
});
emitter.on('chat-loaded-more', () => {
  scrollToTopCheckpoint();
});

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
      <div v-if="props.loading" class="flex justify-center mb-4">
        <base-spinner color="gray" />
      </div>
      <div ref="chatListWrapper">
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
      </div>
    </template>
  </div>
</template>
