<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useFetch } from '@/composes/http.compose';
import { useLoading } from '@/composes/loading.compose';
import { getTopicById } from '@/api/topic.api';
import BaseAlert from '@/components/base/base-alert.vue';
import BaseFetch from '@/components/base/base-fetch.vue';
import ChatEmptyState from '@/components/chat/chat-empty-state.vue';
import { getChats } from '@/api/chat.api';

const route = useRoute();
const {
  data: topic,
  error: topicError,
  fetch: fetchTopicById,
} = useFetch(getTopicById, { single: true });
const { data: chats, error: chatError, fetch: fetchChats } = useFetch(getChats);

const error = computed(() => (topicError.value ? topicError : chatError));

const {
  isLoading: isInitLoading,
  startLoading,
  stopLoading,
} = useLoading(true);
const fetchChatsQuery = reactive({
  topic_id: route.params.id,
});

async function loadData() {
  try {
    startLoading();

    await fetchTopicById(route.params.id);
    await fetchChats(fetchChatsQuery);
  } catch (err) {
    //
  } finally {
    stopLoading();
  }
}

async function handleCreatedChat() {
  await fetchChats(fetchChatsQuery);
}

loadData();
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
            {{ topic.name }}
          </h2>
        </div>
        <div class="flex-grow max-h-screen overflow-y-auto py-4">
          <chat-empty-state
            v-if="chats.meta.count < 1"
            :topic-id="topic.id"
            v-on:created="handleCreatedChat"
          />
          <template v-else>
            <div
              v-for="chat in chats.data"
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
        <div
          class="z-40 flex h-16 shrink-0 items-center gap-x-4 border-t border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
        >
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form class="relative flex flex-1" action="#" method="GET">
              <input
                id="search-field"
                class="block h-full w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Enter to save"
                type="search"
                name="search"
              />
            </form>
          </div>
        </div>
      </template>
    </base-fetch>
  </div>
</template>
