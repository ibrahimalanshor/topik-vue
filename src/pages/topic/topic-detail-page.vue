<script setup>
import { computed, reactive, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from '@/composes/http.compose';
import { useLoading } from '@/composes/loading.compose';
import { useString } from '@/composes/resource.compose';
import { getTopicById, patchTopic } from '@/api/topic.api';
import { getChats } from '@/api/chat.api';
import { getTopicName } from '@/common/modules/topic/topic.util';
import BaseAlert from '@/components/base/base-alert.vue';
import BaseLink from '@/components/base/base-link.vue';
import BaseFetch from '@/components/base/base-fetch.vue';
import ChatCreate from '@/components/chat/chat-create.vue';
import ChatList from '@/components/chat/chat-list.vue';
import TopicEditModal from '@/components/topic/topic-edit-modal.vue';

const emitter = inject('emitter');
const route = useRoute();
const router = useRouter();
const {
  res: topic,
  error: topicError,
  request: fetchTopicById,
  setRes: setTopic,
} = useRequest(getTopicById, {
  initLoading: true,
  initResponse: {},
});
const {
  res: chats,
  error: chatError,
  request: fetchChats,
} = useRequest(getChats, {
  initLoading: true,
  initResponse: {
    data: [],
    meta: {},
  },
});
const { request: updateTopic } = useRequest();
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
const { getString } = useString();

const error = computed(() => (topicError.value ? topicError : chatError));
const fetchChatsQuery = reactive({
  sort: '-id',
  topic_id: route.params.id,
  limit: 30,
});
const editTopicModalVisible = ref(false);

async function loadTopic() {
  await fetchTopicById(route.params.id);
}
async function loadChats() {
  await fetchChats(fetchChatsQuery);
}
async function loadData() {
  try {
    await loadTopic();
    await loadChats();
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
function handleEdit() {
  editTopicModalVisible.value = true;
}
function handleUpdated(res) {
  setTopic(res);
}
function handleDeleted() {
  router.push({ name: 'index' });
}
function handleReloadChat() {
  loadChats();
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
          class="group z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8 gap-x-4"
        >
          <h2 class="font-semibold text-sm leading-6 text-gray-900">
            {{ getTopicName(topic) }}
          </h2>
          <base-link
            v-on:click="handleEdit"
            class="text-xs hidden group-hover:block mt-0.5"
            >{{ getString('common.edit') }}</base-link
          >
        </div>
        <chat-list
          :chats="chats"
          :topic="topic"
          :query="fetchChatsQuery"
          :loading="isLoadMoreLoading"
          v-on:load-more="handleLoadMore"
          v-on:created="handleCreatedChat"
          v-on:reload="handleReloadChat"
        />
        <chat-create
          :topic-id="topic.id"
          :autofocus="!!chats.meta.count"
          v-on:created="handleCreatedChat"
        />

        <topic-edit-modal
          :topic="topic"
          v-model="editTopicModalVisible"
          v-on:success="handleUpdated"
          v-on:deleted="handleDeleted"
        />
      </template>
    </base-fetch>
  </div>
</template>
