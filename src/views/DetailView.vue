<template>
  <div class="space-y-6 detail-wrapper">
    <div class="flex gap-2 flex-wrap mb-4">
      <span class="tag" v-for="(tag, i) in snippet?.tags" :key="i">{{ tag }}</span>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col text-xs sub-text text-center w-fit gap-0.5">
        <snippet-code-icon :language="snippet.language" />
        <span>{{ snippet?.language }}</span>
      </div>
      <h2 class="text-3xl font-bold main-text mb-2">{{ snippet?.title }}</h2>
      <div class="flex items-center text-sm sub-text">
        <span>{{ formatDate(snippet?.created_at) }}</span>
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
      <button @click="goToPage('home')" class="btn-line btn-line-danger">취소</button>
      <button @click="deleteSnippet" class="btn btn-danger">
        <template v-if="isLoading">
          <div
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
        </template>
        <template v-else> 삭제 </template>
      </button>
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
import { storeToRefs } from 'pinia'

const { goToPage } = useNavigation()

const { formatDate } = useDateTime()

const store = useSnippetsStore()
const { isLoading } = storeToRefs(store)

const route = useRoute()
const id = Number(route.params.id)
const snippet = ref({
  id: 0,
  title: '',
  code: '',
  language: '',
  tags: [],
  created_at: '',
})
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
const deleteSnippet = async () => {
  if (confirm(`${snippet.value.title}을 삭제하시겠습니까?`)) {
    const { success, error } = await store.deleteSnippet(snippet.value.id)
    if (success) {
      alert('해당 스니펫이 삭제되었습니다.')
      goToPage('home')
    } else {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
