<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { computed, reactive, inject } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { getTopics } from '@/api/topic.api';
import BaseFetch from '@/components/base/base-fetch.vue';
import BaseEmptyState from '@/components/base/base-empty-state.vue';
import BaseSpinner from '@/components/base/base-spinner.vue';
import PartialSidebarTopicItem from './partial-sidebar-topic-item.vue';

const emitter = inject('emitter');
const { getString } = useString();
const {
  res: topics,
  error,
  isLoading,
  request: fetchTopic,
} = useRequest(getTopics, {
  initLoading: true,
  initResponse: {
    data: [],
    meta: {},
  },
});

const query = reactive({
  sort: '-id',
  limit: 10,
});
const hasMoreItem = computed(
  () => topics.value.meta.limit < topics.value.meta.count
);

async function loadData() {
  try {
    await fetchTopic(query);
  } catch (err) {
    //
  }
}
function refresh() {
  query.limit = 10;

  loadData();
}

function handleLoadMore() {
  query.limit += 10;

  loadData();
}

emitter.on('topic-created', () => {
  refresh();
});
emitter.on('topic-updated', () => {
  refresh();
});
emitter.on('topic-deleted', () => {
  refresh();
});

loadData();
</script>

<template>
  <div>
    <div class="text-xs font-semibold leading-6 text-gray-400">
      {{ getString('sidebar.label.topic-list') }}
    </div>
    <div role="list" class="-mx-2 mt-2 space-y-1">
      <base-fetch
        :count="topics.meta.count"
        :error="error"
        :with-loading="false"
        v-model:visible-error="error.value"
      >
        <template #empty>
          <base-empty-state
            :text="getString('common.empty')"
            text-color="white"
            box-size="sm"
            :button="false"
            :with-icon="false"
          />
        </template>

        <partial-sidebar-topic-item
          v-for="topic in topics.data"
          :key="topic.id"
          :topic="topic"
        />

        <button
          v-if="hasMoreItem"
          class="w-full text-gray-400 hover:text-white hover:bg-gray-800 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
          v-on:click="handleLoadMore"
        >
          <div class="w-6 h-6 flex items-center justify-center">
            <base-spinner size="sm" color="gray" v-if="isLoading" />
            <chevron-down-icon v-else class="w-4 h-4" />
          </div>
          <span class="truncate">{{ getString('common.load-more') }}</span>
        </button>
      </base-fetch>
    </div>
  </div>
</template>
