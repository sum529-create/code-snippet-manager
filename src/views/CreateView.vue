<template>
  <div>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800">새로운 스니펫 생성</h2>
      <hr class="my-4" />
    </div>
    <form class="flex flex-col space-y-6" :class="language && 'min-h-screen '">
      <div class="flex-none">
        <label for="title" class="sub-title">Title</label>
        <input type="text" id="title" v-model="title" placeholder="스니펫 제목을 입력하세요." />
      </div>
      <div class="flex-none">
        <label for="language" class="sub-title">Language</label>
        <select name="language" id="language" v-model="language">
          <option value="">Select Language</option>
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="html5">HTML5</option>
          <option value="css3">CSS</option>
          <option value="react">React</option>
          <option value="vuejs">Vue</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div v-if="language" class="flex flex-col flex-1 monaco-editor-container h-[400px]">
        <span class="sub-title">Code</span>
        <div class="theme-toggle flex items-center gap-3 my-2">
          <span>Code Theme: </span>
          <label class="switch">
            <input type="checkbox" v-model="isDark" />
            <span class="slider">
              <span class="slider-icons">
                <i
                  class="fa-regular fa-star text-yellow-200 text-xs absolute top-1/2 -translate-y-1/2 left-2"
                ></i>
                <i
                  class="fa-regular fa-moon text-blue-200 text-xs absolute top-1/2 -translate-y-1/2 right-2"
                ></i>
              </span>
            </span>
          </label>
          <span class="flex-center space-x-2">
            <span
              >Code Language: <i>{{ language }}</i></span
            >
            <snippet-code-icon :language="language" />
          </span>
        </div>
        <MonacoEditor
          v-model="code"
          class="flex-1"
          @change="handleChange"
          :language="getEditorLanguage"
          :options="editorOptions"
          :theme="isDark ? 'vs-dark' : 'vs-light'"
        />
      </div>
      <div class="flex-none">
        <label for="tags" class="sub-title">Tags (comma separated)</label>
        <input
          type="text"
          v-model="tags"
          name="tags"
          id="tags"
          placeholder="ex) 알고리즘, 상태관리 ..."
        />
      </div>
      <div class="actions flex-none">
        <router-link to="/">
          <button class="btn btn-danger">취소</button>
        </router-link>
        <button @click.prevent="createSnippet" class="btn">생성</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3'
import { monaco } from '@/lib/monaco'
import { computed, ref } from 'vue'
import { useSnippetsStore } from '@/stores/snippet'
import router from '@/router'

const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  wordWrap: 'on',
  formatOnPaste: true,
  automaticLayout: true,
  tabSize: 2,
  roundedSelection: false,
}
monaco

const title = ref('')
const language = ref('')
const code = ref('')
const tags = ref('')
const isDark = ref(false)

const getEditorLanguage = computed(() => {
  switch (language.value) {
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
      return language.value
  }
})
const handleChange = (value: string) => {
  code.value = value
}

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

<style scoped>
.sub-title {
  @apply text-sm font-medium text-gray-700 mb-2;
}
select {
  @apply w-full rounded-lg border p-3;
}
input {
  @apply w-full rounded-lg border p-3;
}
textarea {
  @apply font-mono h-64 w-full bg-gray-50 rounded-lg border p-3;
}
.actions {
  @apply flex justify-end gap-4 mt-6;
}
</style>
