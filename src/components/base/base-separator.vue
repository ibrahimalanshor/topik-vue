<template>
  <div class="block relative">
    <div class="absolute inset-0 w-full flex items-center">
      <div class="w-full border-t"></div>
    </div>
    <div class="relative flex items-center justify-center">
      <span class="bg-white px-6 font-light text-gray-500 text-sm">
        <slot />
      </span>
    </div>
  </div>
</template>
