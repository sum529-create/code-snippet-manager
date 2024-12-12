<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>
    <pre v-if="$slots.code" class="card-code">
      <slot name="code" />
    </pre>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  @apply bg-white border shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] rounded-lg border-gray-200 hover:bg-[#E9EFF5];
}
.card-header {
  @apply p-4 font-bold text-base sm:text-lg md:text-base lg:text-lg bg-[lightblue] flex flex-nowrap items-center justify-between gap-[1em] align-middle;
}
.card-body,
.card-code {
  @apply bg-gray-50 h-32 line-clamp-3 p-4;
}
.card-code {
  @apply font-mono overflow-auto whitespace-pre-wrap break-words w-full overflow-x-auto;
}
.card-footer {
  @apply p-4 flex items-center justify-between text-sm text-gray-500;
}
</style>
