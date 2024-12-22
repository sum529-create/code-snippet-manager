<template>
  <!-- [layout] 0: Grid, 1: List -->
  <snippet-filter @layout="(sel: number) => (layout = sel)" />
  <template v-if="isLoading">
    <app-loading />
  </template>
  <template v-else>
    <app-grid :data="data" :class="layout === 0 ? 'snippet-grid' : 'snippet-list'">
      <template v-slot="{ item }">
        <snippet-card :item="item" @click="goToPage('SnippetDetail', { id: item.id })" />
      </template>
    </app-grid>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSnippetsStore } from '@/stores/snippet'
import { storeToRefs } from 'pinia'
import { useNavigation } from '@/composables/useNavigation'

const { goToPage } = useNavigation()

const store = useSnippetsStore()
onMounted(async () => {
  await store.fetchSnippets()
})
const { filteredSnippets: data, isLoading } = storeToRefs(store)

const layout = ref(0)
</script>

<style scoped></style>
