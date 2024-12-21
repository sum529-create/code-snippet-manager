<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800">스니펫 수정</h2>
      <hr class="my-4" />
    </div>
    <snippet-form
      v-if="snippet"
      v-model:title="snippet.title"
      v-model:language="snippet.language"
      v-model:code="snippet.code"
      v-model:tags="strTags"
      :isDark="false"
    >
      <template #actions>
        <button @click.prevent="goToPage('home')" class="btn btn-danger">취소</button>
        <button @click.prevent="editSnippet" class="btn">수정</button>
      </template>
    </snippet-form>
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'
import { useSnippetsStore } from '@/stores/snippet'
import type { Snippet } from '@/types/snippet'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { goToPage } = useNavigation()
const store = useSnippetsStore()
const route = useRoute()
const id = Number(route.params.id)
type EditSnippet = Pick<Snippet, 'title' | 'language' | 'code' | 'tags'>
const snippet = ref<EditSnippet>({
  title: '',
  language: '',
  code: '',
  tags: [],
})
const strTags = ref('')

onMounted(async () => {
  const result = await store.getSnippet(id)
  if (result?.success) {
    snippet.value = result.data
    strTags.value = result.data.tags?.toString()
  }
})

const editSnippet = async () => {
  if (confirm('수정하시겠습니까?')) {
    const result = await store.updateSnippet(id, {
      ...snippet.value,
      tags: strTags.value.split(',').map((e) => e.trim()),
    })

    if (result) {
      const { success, error } = result

      if (success) {
        alert('스니펫이 수정되었습니다.')
        goToPage('home')
      } else {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped></style>
