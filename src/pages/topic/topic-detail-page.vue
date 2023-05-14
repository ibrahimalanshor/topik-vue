<script setup>
import { useRoute } from 'vue-router';
import { useFetch } from '@/composes/http.compose';
import { getTopicById } from '@/api/topic.api';
import BaseAlert from '@/components/base/base-alert.vue';
import BaseFetch from '@/components/base/base-fetch.vue';
import BaseSpinner from '@/components/base/base-spinner.vue';

import { computed } from 'vue';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const chats = computed(() => {
  const dates = faker.date.betweens(
    dayjs().startOf('day').format(),
    dayjs().endOf('day').format(),
    100
  );

  return dates.map((date) => ({
    created_at: date,
    username: faker.internet.userName(),
    text: faker.lorem.sentences(),
  }));
});

const route = useRoute();
const {
  data: topic,
  error,
  isLoading,
  fetch: fetchTopicById,
} = useFetch(getTopicById, { single: true });

async function loadData() {
  try {
    await fetchTopicById(route.params.id);
  } catch (err) {
    //
  }
}

loadData();
</script>

<template>
  <div class="h-screen flex flex-col relative">
    <base-fetch
      :loading="isLoading"
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
          <div
            v-for="chat in chats"
            :key="chat"
            class="flex gap-x-4 hover:bg-gray-100 py-1 px-8"
          >
            <p class="flex-shrink-0 font-light text-gray-500">
              {{ dayjs(chat.created_at).format('HH:mm:ss') }}
            </p>
            <p class="inline text-gray-900">{{ chat.text }}</p>
          </div>
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
