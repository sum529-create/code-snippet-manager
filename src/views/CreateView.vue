<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800">새로운 스니펫 생성</h2>
      <hr class="my-4" />
    </div>
    <snippet-form
      v-model:title="title"
      v-model:code="code"
      v-model:language="language"
      v-model:tags="tags"
      v-model:isDark="isDark"
    >
      <template #actions>
        <button @click.prevent="goToPage('home')" class="btn btn-danger">취소</button>
        <button @click.prevent="createSnippet" class="btn">
          <template v-if="isLoading">
            <div
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </template>
          <template v-else> 생성 </template>
        </button>
      </template>
    </snippet-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSnippetsStore } from '@/stores/snippet'
import { useNavigation } from '@/composables/useNavigation'
import { storeToRefs } from 'pinia'
import { useInputValidation } from '@/composables/useInputValidation'

const title = ref('')
const language = ref('')
const code = ref('')
const tags = ref('')
const isDark = ref(false)

const store = useSnippetsStore()

const { isLoading } = storeToRefs(store)

const { goToPage } = useNavigation()

const { validateTitle } = useInputValidation()

const createSnippet = async () => {
  if (!title.value) {
    return alert('스니펫 제목을 입력해주세요.')
  }
  if (!language.value) {
    return alert('작성하실 언어를 선택해주세요.')
  }
  if (!code.value) {
    return alert('코드를 입력해주세요.')
  }
  if (!tags.value) {
    return alert('하나이상의 태그를 입력해주세요.')
  }

  const newSnippets = {
    title: title.value,
    code: code.value,
    language: language.value,
    tags: tags.value.split(',').map((t) => t.trim()),
  }

  const { success, error } = await store.createSnippet(newSnippets)
  if (success) {
    goToPage('home')
  } else {
    console.error(error)
  }
}
</script>

<style scoped></style>
