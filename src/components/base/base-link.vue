<script setup>
const emit = defineEmits(['click']);

function handleClick() {
  emit('click');
}
</script>

<template>
  <a
    href="#"
    class="font-medium text-sm text-blue-600 hover:text-blue-500"
    v-on:click="handleClick"
    ><slot
  /></a>
</template>
