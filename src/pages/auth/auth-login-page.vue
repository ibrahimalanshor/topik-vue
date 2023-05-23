<script setup>
import { reactive } from 'vue';
import { RocketLaunchIcon } from '@heroicons/vue/24/outline';
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
  password: null,
});

async function handleSubmit() {
  emit('submit', form);
}
</script>

<template>
  <div class="h-screen">
    <div
      class="mx-auto max-w-lg px-4 h-full flex items-center justify-center sm:px-6 lg:px-0"
    >
      <div>
        <div class="text-center">
          <rocket-launch-icon class="mx-auto h-8 w-8 text-gray-900" />
        </div>
        <form class="mt-6 flex gap-x-4" v-on:submit.prevent="handleSubmit">
          <base-input
            :placeholder="getString('login.label.password')"
            autofocus
            v-model="form.password"
          />
          <base-button
            type="submit"
            :disabled="
              props.loading || (props.disabledIfEmpty && !form.password)
            "
            :loading="props.loading"
            color="black"
            :classes="{
              button: 'flex-shrink-0',
            }"
            >{{ getString('login.label.submit') }}</base-button
          >
        </form>
      </div>
    </div>
  </div>
</template>
