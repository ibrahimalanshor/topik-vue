<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { formatDate } from '@/common/utils/date.util';

const props = defineProps({
  chat: Object,
});
</script>

<template>
  <div class="relative group flex gap-x-4 hover:bg-gray-100 py-1 px-8 relative">
    <p class="flex-shrink-0 font-light text-gray-500">
      {{ formatDate(props.chat.created_at, 'HH:mm:ss') }}
    </p>
    <p class="inline text-gray-900 break-all">{{ props.chat.content }}</p>
    <div
      class="absolute -top-4 right-8 z-10 hidden group-hover:block shadow rounded mt-1"
    >
      <button
        class="p-1 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-500 rounded-l"
      >
        <pencil-square-icon class="w-4 h-4" />
      </button>
      <button
        class="p-1 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-500 rounded-r"
      >
        <trash-icon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
