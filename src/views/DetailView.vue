<template>
  <div class="space-y-6">
    <div class="flex gap-2 flex-wrap mb-4">
      <span class="tag" v-for="(tag, i) in snippet?.tags" :key="i">{{ tag }}</span>
    </div>
    <div class="flex flex-col">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ snippet?.title }}</h2>
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span>{{ formatDate(snippet?.created_at) }}</span>
        <span>{{ snippet?.language }}</span>
      </div>
    </div>
    <div class="rounded-lg shadow-sm border flex h-[400px] border-gray-200 mt-6 p-4">
      <MonacoEditor
        v-if="snippet"
        :value="snippet.code"
        :language="getEditorLanguage"
        :options="{
          readOnly: true,
          minimap: { enabled: false },
        }"
      />
    </div>
    <div class="flex justify-end gap-4 mt-6">
      <button @click="goToPage('home')" class="btn btn-danger">취소</button>
      <button @click="goToPage('SnippetEdit', { id: snippet?.id })" class="btn">수정</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateTime } from '@/composables/useDateTime'
import { useNavigation } from '@/composables/useNavigation'
import { useSnippetsStore } from '@/stores/snippet'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MonacoEditor from 'monaco-editor-vue3'

const { goToPage } = useNavigation()

const { formatDate } = useDateTime()

const store = useSnippetsStore()
const route = useRoute()
const id = Number(route.params.id)
const snippet = ref()
onMounted(async () => {
  const result = await store.getSnippet(id)
  if (result?.success) {
    const { data } = result
    snippet.value = data
  }
})
const getEditorLanguage = computed(() => {
  switch (snippet.value.language) {
    case 'js':
    case 'react':
    case 'vuejs':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'css3':
      return 'css'
    case 'html5':
      return 'html'
    default:
      return snippet.value.language
  }
})
</script>

<style scoped></style>
