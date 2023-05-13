<script setup>
import { useString } from '@/composes/resource.compose';
import PartialSidebarTopicItem from './partial-sidebar-topic-item.vue';

const { getString } = useString();

const topics = [
  { id: 1, name: 'Heroicons' },
  { id: 2, name: 'Tailwind Labs' },
  { id: 3, name: 'Workcation' },
];
</script>

<template>
  <div class="text-xs font-semibold leading-6 text-gray-400">
    {{ getString('sidebar.label.topic-list') }}
  </div>
  <div role="list" class="-mx-2 mt-2 space-y-1">
    <partial-sidebar-topic-item
      v-for="topic in topics"
      :key="topic.id"
      :topic="topic"
    />
  </div>
</template>
