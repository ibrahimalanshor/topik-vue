<script setup>
import { computed } from 'vue';
import BaseCard from '@/components/base/base-card.vue';
import BaseX from '@/components/base/base-x.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  title: String,
});
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});

function handleClose() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="visible"
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-50">
      <div
        class="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
      >
        <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
        <base-card
          class="relative shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm"
          :title="props.title"
          :with-header="props.withHeader"
          v-click-outside="handleClose"
        >
          <template #action>
            <base-x v-on:click="handleClose"></base-x>
          </template>
          <slot />
        </base-card>
      </div>
    </div>
  </div>
</template>
