<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>
    <div v-if="$slots.code" class="card-code">
      <pre><slot name="code" /></pre>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  @apply border shadow-lg hover:shadow-2xl rounded-lg transition-transform transform hover:-translate-y-2;
  background-color: var(--card-background);
  border-color: var(--card-border);
}
.card-header {
  @apply p-4 font-bold text-base sm:text-lg md:text-base lg:text-lg shadow-sm flex flex-nowrap items-center justify-between gap-[1em] align-middle;
  background-color: var(--card-header-background);
  color: var(--card-header-text);
}
.card-body,
.card-code {
  @apply h-32 line-clamp-3 p-4;
  background-color: var(--card-body-background);
}
.card-code {
  @apply font-mono overflow-auto whitespace-pre-wrap break-words w-full overflow-x-auto m-0 p-0;
}
.card-code pre {
  @apply m-0 h-[inherit];
}
.card-footer {
  @apply p-4 flex items-center justify-between text-sm;
  background-color: var(--card-footer-background);
  color: var(--card-footer-text);
}
</style>
