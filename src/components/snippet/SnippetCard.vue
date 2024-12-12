<template>
  <app-card>
    <template #header>
      <h2>{{ item.title }}</h2>
      <font-awesome-icon v-if="isValidLanguage(item.language)" :icon="['fab', item.language]" />
      <font-awesome-icon v-else :icon="['fas', 'code']" />
    </template>
    <template #code>
      <code :class="`language-${getLanClass(item.language)}`">
        {{ item.code }}
      </code>
    </template>
    <template #footer>
      <div class="flex flex-col flex-1">
        <span>
          {{ item.createdAt }}
        </span>
        <div class="flex gap-1 py-2">
          <span v-for="(tag, i) in item.tags" :key="i" class="tag">{{ tag }}</span>
        </div>
        <div class="flex gap-1 justify-end">
          <button class="btn btn-confirm">수정</button>
          <button class="btn btn-danger">삭제</button>
        </div>
      </div>
    </template>
  </app-card>
</template>

<script setup lang="ts">
import Prism from 'prismjs'
import { onMounted, nextTick } from 'vue'

// setup 내부에서
onMounted(() => {
  nextTick(() => {
    Prism.highlightAll()
  })
})

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const validLan = ['vuejs', 'react', 'css3', 'js', 'python', 'java', 'html5']
const isValidLanguage = (codeNm: string) => {
  return validLan.includes(codeNm)
}
const getLanClass = (lan: string) => {
  const mapping: Record<string, string> = {
    vuejs: 'js',
    react: 'js',
    css3: 'css',
  }
  return mapping[lan] || 'js'
}
</script>

<style scoped>
pre code {
  @apply text-sm sm:text-xs md:text-[10px];
}
</style>
