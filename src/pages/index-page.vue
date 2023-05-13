<script setup>
import { computed } from 'vue';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import LayoutApp from '@/components/layout/layout-app.vue';

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
</script>

<template>
  <layout-app>
    <div class="h-screen flex flex-col">
      <div class="flex-grow max-h-screen overflow-y-auto">
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
    </div>
  </layout-app>
</template>
