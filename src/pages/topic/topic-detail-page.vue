<script setup>
import { computed, reactive, ref, inject, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch, usePost } from '@/composes/http.compose';
import { useLoading } from '@/composes/loading.compose';
import { getTopicById, patchTopic } from '@/api/topic.api';
import { getChats } from '@/api/chat.api';
import { getTopicName } from '@/common/modules/topic/topic.util';
import BaseAlert from '@/components/base/base-alert.vue';
import BaseFetch from '@/components/base/base-fetch.vue';
import ChatCreate from '@/components/chat/chat-create.vue';
import ChatList from '@/components/chat/chat-list.vue';

const emitter = inject('emitter');
const route = useRoute();
const {
  data: topic,
  error: topicError,
  fetch: fetchTopicById,
  setData: setTopic,
} = useFetch(getTopicById, { single: true });
const { data: chats, error: chatError, fetch: fetchChats } = useFetch(getChats);
const { post: updateTopic } = usePost();
const {
  isLoading: isInitLoading,
  startLoading: startInitLoading,
  stopLoading: stopInitLoading,
} = useLoading(true);
const {
  isLoading: isLoadMoreLoading,
  startLoading: startLoadMoreLoading,
  stopLoading: stopLoadMoreLoading,
} = useLoading();

const error = computed(() => (topicError.value ? topicError : chatError));
const fetchChatsQuery = reactive({
  sort: '-id',
  topic_id: route.params.id,
  limit: 30,
});

async function loadData() {
  try {
    await fetchTopicById(route.params.id);
    await fetchChats(fetchChatsQuery);
  } catch (err) {
    // console.log(err);
  }
}
async function init() {
  try {
    startInitLoading();

    await loadData();
  } finally {
    stopInitLoading();
  }
}

async function handleCreatedChat(chat) {
  try {
    await fetchChats(fetchChatsQuery);

    if (!topic.value.name) {
      const res = await updateTopic(
        async () =>
          await patchTopic(topic.value.id, { name: chat.content.substr(0, 20) })
      );

      setTopic(res);

      emitter.emit('topic-updated');
    }

    emitter.emit('chat-created-and-reloaded');
  } catch (err) {
    // console.log(err)
  }
}
async function handleLoadMore() {
  try {
    startLoadMoreLoading();

    fetchChatsQuery.limit += 30;

    await fetchChats(fetchChatsQuery);

    emitter.emit('chat-loaded-more');
  } finally {
    stopLoadMoreLoading();
  }
}

init();
</script>

<template>
  <div class="h-screen flex flex-col relative">
    <base-fetch
      :loading="isInitLoading"
      :error="error"
      v-model:visible-error="error.value"
    >
      <template #error>
        <div class="p-4">
          <base-alert
            :message="error.message"
            color="red"
            with-icon
            v-model="error.value"
          />
        </div>
      </template>

      <template v-if="!error.value">
        <div
          class="z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
        >
          <h2 class="font-semibold text-sm leading-6 text-gray-900">
            {{ getTopicName(topic) }}
          </h2>
        </div>
        <chat-list
          :chats="chats"
          :topic="topic"
          :query="fetchChatsQuery"
          :loading="isLoadMoreLoading"
          v-on:load-more="handleLoadMore"
          v-on:created="handleCreatedChat"
        />
        <chat-create
          :topic-id="topic.id"
          :autofocus="!!chats.meta.count"
          v-on:created="handleCreatedChat"
        />
      </template>
    </base-fetch>
  </div>
</template>
