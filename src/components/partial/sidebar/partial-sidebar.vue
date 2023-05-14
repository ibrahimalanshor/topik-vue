<script setup>
import PartialSidebarTopicCreate from './partial-sidebar-topic-create.vue';
import PartialSidebarTopicList from './partial-sidebar-topic-list.vue';
</script>

<template>
  <div
    class="h-screen lg:inset-y-0 lg:z-50 flex lg:w-72 flex-col flex grow flex-col gap-y-5 bg-gray-900 pt-5"
  >
    <div class="px-6">
      <partial-sidebar-topic-create />
    </div>
    <nav class="flex flex-1 flex-col max-h-screen overflow-y-auto px-6 pb-6">
      <div role="list" class="flex flex-1 flex-col gap-y-7">
        <partial-sidebar-topic-list />
      </div>
    </nav>
  </div>
</template>
