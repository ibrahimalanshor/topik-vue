<script setup>
import { reactive } from 'vue';
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline';
import { useString } from '@/composes/resource.compose';
import BaseInput from '@/components/base/base-input.vue';
import BaseButton from '@/components/base/base-button.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabledIfEmpty: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['submit']);

const { getString } = useString();

const form = reactive({
  content: null,
});

async function handleSubmit() {
  emit('submit', form);
}
</script>

<template>
  <div
    class="mx-auto max-w-lg px-4 h-full flex items-center justify-center sm:px-6 lg:px-0"
  >
    <div>
      <div class="text-center">
        <chat-bubble-bottom-center-icon class="mx-auto h-8 w-8 text-gray-400" />
        <h2 class="mt-2 text-base font-semibold leading-6 text-gray-900">
          {{ getString('chat.label.start-chat-title') }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ getString('chat.label.start-chat-description') }}
        </p>
      </div>
      <form class="mt-6 flex gap-x-4" v-on:submit.prevent="handleSubmit">
        <base-input
          :placeholder="getString('chat.label.start-chat-placeholder')"
          autofocus
          v-model="form.content"
        />
        <base-button
          type="submit"
          :disabled="props.loading || (props.disabledIfEmpty && !form.content)"
          :loading="props.loading"
          color="black"
          :classes="{
            button: 'flex-shrink-0',
          }"
          >{{ getString('common.send') }}</base-button
        >
      </form>
    </div>
  </div>
</template>
