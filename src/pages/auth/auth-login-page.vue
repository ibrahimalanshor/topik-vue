<script setup>
import { reactive } from 'vue';
import { RocketLaunchIcon } from '@heroicons/vue/24/outline';
import { useToastStore } from '@/store/modules/toast.store';
import { useString } from '@/composes/resource.compose';
import { useRequest } from '@/composes/http.compose';
import BaseInput from '@/components/base/base-input.vue';
import BaseButton from '@/components/base/base-button.vue';
import { postLogin } from '@/api/auth.api';

const { getString } = useString();
const toastStore = useToastStore();
const { error, isLoading, request: login } = useRequest(postLogin);

const form = reactive({
  password: null,
});

async function handleSubmit() {
  try {
    await login(form);
  } catch (err) {
    const message =
      error.server && error.errors.status === 422
        ? getFirstObjectValue(error.errors.errors)
        : error.message;

    toastStore.createToast({
      id: 'error-login',
      message: message,
      color: 'red',
    });
  }
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
            :disabled="isLoading"
            :loading="isLoading"
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
