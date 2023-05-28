<script setup>
import { computed, inject, reactive, ref, watch } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useToastStore } from '@/store/modules/toast.store';
import { useRequest } from '@/composes/http.compose';
import { patchTopic } from '@/api/topic.api';
import { getFirstObjectValue } from '@/common/utils/object.util';
import BaseModal from '@/components/base/base-modal.vue';
import BaseInput from '@/components/base/base-input.vue';
import BaseButton from '@/components/base/base-button.vue';
import TopicDeleteConfirm from './topic-delete-confirm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  topic: Object,
});
const emit = defineEmits(['update:modelValue', 'success', 'deleted']);

const emitter = inject('emitter');
const { getString } = useString();
const toastStore = useToastStore();
const { request: updateTopic, isLoading, error } = useRequest();

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const visibleDeleteConfirm = ref(false);
const form = reactive({
  name: null,
});

function setForm() {
  form.name = props.topic.name;
}

async function handleSubmit() {
  try {
    const res = await updateTopic(
      async () => await patchTopic(props.topic.id, form)
    );

    toastStore.createToast({
      id: 'success-update-topic',
      message: getString('topic.message.updated'),
      color: 'blue',
    });

    visible.value = false;

    emit('success', res);
    emitter.emit('topic-updated');
  } catch (err) {
    const message =
      error.server && error.errors.status === 422
        ? getFirstObjectValue(error.errors.errors)
        : error.message;

    toastStore.createToast({
      id: 'error-create-topic',
      message: message,
      color: 'red',
    });
  }
}
function handleDelete() {
  visibleDeleteConfirm.value = true;
}
function handleDeleted() {
  visible.value = false;

  emit('deleted');
}

watch(visible, () => {
  if (visible.value) {
    setForm();
  }
});
</script>

<template>
  <base-modal :with-header="false" v-model="visible">
    <form class="space-y-4" v-on:submit.prevent="handleSubmit">
      <base-input
        :label="getString('topic.attributes.name')"
        :placeholder="getString('topic.attributes.name')"
        with-label
        v-model="form.name"
      />
      <div class="flex justify-end gap-x-2">
        <base-button
          type="submit"
          :disabled="isLoading"
          :loading="isLoading"
          color="black"
          >{{ getString('common.save') }}</base-button
        >
        <base-button
          type="button"
          :disabled="isLoading"
          :loading="isLoading"
          color="red"
          v-on:click="handleDelete"
          >{{ getString('common.delete') }}</base-button
        >
      </div>
    </form>

    <topic-delete-confirm
      :topic="props.topic"
      v-model="visibleDeleteConfirm"
      v-on:success="handleDeleted"
    />
  </base-modal>
</template>
