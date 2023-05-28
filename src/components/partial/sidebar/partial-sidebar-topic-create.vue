<script setup>
import { inject } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import { postTopic } from '@/api/topic.api';
import BaseButton from '@/components/base/base-button.vue';
import { useRouter } from 'vue-router';

const emitter = inject('emitter');
const router = useRouter();
const { getString } = useString();
const { isLoading, request: storeTopic } = useRequest(postTopic);

async function handleCreate() {
  try {
    const res = await storeTopic();

    emitter.emit('topic-created');
    router.push({ name: 'topic.detail', params: { id: res.id } });
  } catch (err) {
    //
  }
}
</script>

<template>
  <base-button
    block
    :loading="isLoading"
    :disabled="isLoading"
    :shadowed="false"
    :bordered="false"
    v-on:click="handleCreate"
    >{{ getString('sidebar.label.new-topic') }}</base-button
  >
</template>
