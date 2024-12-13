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
  @apply bg-[#E9EFF5] border shadow-lg hover:shadow-2xl rounded-lg border-gray-200 transition-transform transform hover:-translate-y-2;
}
.card-header {
  @apply p-4 font-bold text-base sm:text-lg md:text-base lg:text-lg bg-indigo-100 shadow-sm flex flex-nowrap items-center justify-between gap-[1em] align-middle;
}
.card-body,
.card-code {
  @apply bg-gray-50 h-32 line-clamp-3 p-4;
}
.card-code {
  @apply font-mono overflow-auto whitespace-pre-wrap break-words w-full overflow-x-auto m-0;
}
.card-footer {
  @apply p-4 flex items-center justify-between text-sm text-gray-500;
}
</style>
