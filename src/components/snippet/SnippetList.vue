<template>
  <!-- [layout] 0: Grid, 1: List -->
  <snippet-filter @layout="(sel: number) => (layout = sel)" />
  <app-grid :data="data" :class="layout === 0 ? 'snippet-grid' : 'snippet-list'">
    <template v-slot="{ item }">
      <snippet-card :item="item" @click="goPage(item.id)" />
    </template>
  </app-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSnippetsStore } from '@/stores/snippet'
import { storeToRefs } from 'pinia'
import router from '@/router'

const store = useSnippetsStore()
onMounted(async () => {
  await store.fetchSnippets()
})
const { filteredSnippets: data } = storeToRefs(store)

const layout = ref(0)

const goPage = (id: number) => {
  router.push({
    name: 'SnippetDetail',
    params: {
      id,
    },
  })
}
</script>

<style scoped></style>
