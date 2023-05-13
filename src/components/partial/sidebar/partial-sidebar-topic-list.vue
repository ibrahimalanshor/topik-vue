<script setup>
import { reactive } from 'vue';
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
});

async function loadData() {
  try {
    await fetchTopic(query);
  } catch (err) {
    //
  }
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
      </base-fetch>
    </div>
  </div>
</template>
