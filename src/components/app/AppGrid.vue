<template>
  <div>
    <div v-for="(item, i) in data" :key="i">
      <slot :item="item" :index="i"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped></style>
