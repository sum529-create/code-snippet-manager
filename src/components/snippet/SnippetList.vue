<template>
  <main>
    <div class="container py-4 mx-auto my-0 px-4 md:px-6 lg:px-8 space-y-6">
      <!-- [layout] 0: Grid, 1: List -->
      <snippet-filter @layout="(sel: number) => (layout = sel)" />
      <app-grid :data="data" :class="layout === 0 ? 'snippet-grid' : 'snippet-list'">
        <template v-slot="{ item }">
          <snippet-card :item="item" />
        </template>
      </app-grid>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dummySnippets } from '@/data/snippets'

const data = ref(dummySnippets)
const layout = ref(0)
</script>

<style scoped></style>
