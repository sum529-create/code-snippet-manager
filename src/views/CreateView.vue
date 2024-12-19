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
        <router-link to="/">
          <button class="btn btn-danger">취소</button>
        </router-link>
        <button @click.prevent="createSnippet" class="btn">생성</button>
      </template>
    </snippet-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSnippetsStore } from '@/stores/snippet'
import router from '@/router'

const title = ref('')
const language = ref('')
const code = ref('')
const tags = ref('')
const isDark = ref(false)

const store = useSnippetsStore()

const createSnippet = async () => {
  const newSnippets = {
    title: title.value,
    code: code.value,
    language: language.value,
    tags: tags.value.split(',').map((t) => t.trim()),
  }

  const { success, error } = await store.createSnippet(newSnippets)
  if (success) {
    router.push({
      name: 'home',
    })
  } else {
    console.error(error)
  }
}
</script>

<style scoped></style>
