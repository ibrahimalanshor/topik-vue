<script setup>
import { computed, inject, reactive, watch } from 'vue';
import { useString } from '@/composes/resource.compose';
import { useToastStore } from '@/store/modules/toast.store';
import { usePost } from '@/composes/http.compose';
import { patchTopic } from '@/api/topic.api';
import { getFirstObjectValue } from '@/common/utils/object.util';
import BaseModal from '@/components/base/base-modal.vue';
import BaseInput from '@/components/base/base-input.vue';
import BaseButton from '@/components/base/base-button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  topic: Object,
});
const emit = defineEmits(['update:modelValue', 'success']);

const emitter = inject('emitter');
const { getString } = useString();
const toastStore = useToastStore();
const { post: updateTopic, isLoading, error } = usePost();

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
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
      <div class="flex justify-end">
        <base-button :disabled="isLoading" :loading="isLoading" color="black">{{
          getString('common.save')
        }}</base-button>
      </div>
    </form>
  </base-modal>
</template>
