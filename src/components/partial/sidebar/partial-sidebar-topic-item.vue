<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getTopicName } from '@/common/modules/topic/topic.util';

const props = defineProps({
  topic: Object,
});

const route = useRoute();

const active = computed(() => route.params.id == props.topic.id);
</script>

<template>
  <div>
    <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
    <router-link
      :to="{ name: 'topic.detail', params: { id: props.topic.id } }"
      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      :class="[
        active
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800',
      ]"
    >
      <span
        class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
        >{{ getTopicName(props.topic).charAt(0) }}</span
      >
      <span class="truncate">{{ getTopicName(props.topic) }}</span>
    </router-link>
  </div>
</template>
