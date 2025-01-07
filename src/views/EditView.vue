<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold text-[var(--color-gray-800)]">스니펫 수정</h2>
      <hr class="my-4" />
    </div>
    <snippet-form
      v-if="snippet"
      v-model:title="snippet.title"
      v-model:language="snippet.language"
      v-model:code="snippet.code"
      v-model:tags="strTags"
      v-model:isDark="isDark"
    >
      <template #actions>
        <button @click.prevent="goToPage('home')" class="btn btn-danger">취소</button>
        <button @click.prevent="editSnippet" class="btn">
          <template v-if="isLoading">
            <div
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </snippet-form>
  </div>
</template>

<script setup lang="ts">
import { useInputValidation } from '@/composables/useInputValidation'
import { useNavigation } from '@/composables/useNavigation'
import { useSnippetsStore } from '@/stores/snippet'
import type { Snippet } from '@/types/snippet'
import { profanityFilter } from '@/utils/profanityFilter'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { goToPage } = useNavigation()
const store = useSnippetsStore()
const { isLoading } = storeToRefs(store)
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
const isDark = ref(false)

onMounted(async () => {
  const result = await store.getSnippet(id)
  if (result?.success) {
    snippet.value = result.data
    strTags.value = result.data.tags?.toString()
  }
})

const { validateTitle } = useInputValidation()

const editSnippet = async () => {
  const { inValid, message } = validateTitle(snippet.value.title)
  if (!inValid) {
    return alert(message)
  }

  if (!(await profanityFilter(snippet.value.title))) {
    return alert('스니펫 제목에 금칙어를 제거해주세요.')
  }
  if (!snippet.value.title) {
    return alert('스니펫 제목을 입력해주세요.')
  }
  if (!snippet.value.language) {
    return alert('작성하실 언어를 선택해주세요.')
  }
  if (!snippet.value.code) {
    return alert('코드를 입력해주세요.')
  }
  if (!snippet.value.tags) {
    return alert('하나이상의 태그를 입력해주세요.')
  }
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
    } else {
      alert('스니펫 수정을 실패하였습니다.')
    }
  }
}
</script>

<style scoped></style>
