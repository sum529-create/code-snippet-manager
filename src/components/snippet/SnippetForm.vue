<template>
  <form @submit.prevent class="flex flex-col space-y-6" :class="language && 'min-h-screen '">
    <div class="flex-none">
      <label for="title" class="sub-title">Title</label>
      <input
        type="text"
        id="title"
        @keydown.enter.prevent
        :value="title"
        @input="$emit('update:title', ($event.target as HTMLSelectElement).value)"
        placeholder="스니펫 제목을 입력하세요."
      />
    </div>
    <div class="flex-none">
      <label for="language" class="sub-title">Language</label>
      <select
        name="language"
        id="language"
        :value="language"
        @input="$emit('update:language', ($event.target as HTMLSelectElement).value)"
      >
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
          <input
            type="checkbox"
            :checked="isDark"
            @change="$emit('update:isDark', ($event.target as HTMLInputElement).checked)"
          />
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
        :value="code"
        class="flex-1"
        @change="$emit('update:code', $event)"
        :language="getEditorLanguage"
        :options="editorOptions"
        :theme="isDark ? 'vs-dark' : 'vs-light'"
      />
    </div>
    <div class="flex-none">
      <div v-for="(tag, i) in submitTags" :key="i">
        {{ tag }}
      </div>
      <label for="tags" class="sub-title">Tags (comma separated)</label>
      <input
        type="text"
        :value="tags"
        @keyup="handleInput"
        @keydown.enter.prevent
        @input="$emit('update:tags', ($event.target as HTMLSelectElement).value)"
        name="tags"
        id="tags"
        placeholder="ex) 알고리즘, 상태관리 ..."
      />
    </div>
    <div class="actions flex-none">
      <slot name="actions"> </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3'
import { monaco } from '@/lib/monaco'
import { computed, ref } from 'vue'

const props = defineProps({
  title: String,
  language: String,
  code: String,
  tags: String,
  isDark: Boolean,
})
const emits = defineEmits([
  'update:title',
  'update:language',
  'update:code',
  'update:tags',
  'update:isDark',
])

const submitTags = ref<string[]>([])

const handleInput = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    const tag = props.tags?.trim().slice(0, -1)
    if (tag && !submitTags.value?.includes(tag)) {
      submitTags.value.push(tag)
    }
    setTimeout(() => {
      emits('update:tags', '')
    }, 100)
  }
}

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

const getEditorLanguage = computed(() => {
  switch (props.language) {
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
      return props.language
  }
})
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
