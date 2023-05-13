<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { computed, reactive } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useFetch } from '@/composes/http.compose';
import { getTopics } from '@/api/topic.api';
import BaseFetch from '@/components/base/base-fetch.vue';
import BaseEmptyState from '@/components/base/base-empty-state.vue';
import PartialSidebarTopicItem from './partial-sidebar-topic-item.vue';

const { getString } = useString();
const { data: topics, error, fetch: fetchTopic } = useFetch(getTopics);

const query = reactive({
  sort: '-id',
  limit: 10,
});
const hasMoreItem = computed(() => query.limit < topics.value.count);

async function loadData() {
  try {
    await fetchTopic(query);
  } catch (err) {
    //
  }
}

function handleLoadMore() {
  query.limit += 10;

  loadData();
}

loadData();
</script>

<template>
  <div>
    <div class="text-xs font-semibold leading-6 text-gray-400">
      {{ getString('sidebar.label.topic-list') }}
    </div>
    <div role="list" class="-mx-2 mt-2 space-y-1">
      <base-fetch
        :count="topics.count"
        :error="error"
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
            <chevron-down-icon class="w-4 h-4" />
          </div>
          <span class="truncate">Load More</span>
        </button>
      </base-fetch>
    </div>
  </div>
</template>
