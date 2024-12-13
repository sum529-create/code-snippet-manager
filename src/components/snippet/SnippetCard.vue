<template>
  <app-card>
    <template #header>
      <h2>{{ item.title }}</h2>
      <font-awesome-icon
        v-if="isValidLanguage(item.language)"
        :class="setIconColor(item.language)"
        :icon="['fab', item.language]"
      />
      <font-awesome-icon v-else :icon="['fas', 'code']" />
    </template>
    <template #code>
      <code :class="`language-${getLanClass(item.language)}`">
        {{ item.code }}
      </code>
    </template>
    <template #footer>
      <div class="flex flex-col flex-1 space-y-2">
        <div class="flex gap-1 pb-4 relative">
          <span v-for="(tag, i) in item.tags" :key="i" class="tag">{{ tag }}</span>
          <span class="absolute left-0 bottom-0 w-full h-px bg-gray-300"></span>
        </div>
        <div class="flex justify-between items-center flex-wrap">
          <span class="flex items-center gap-1 align-middle leading-none;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {{ item.createdAt }}
          </span>
          <div class="flex gap-1 justify-end">
            <button class="btn-icon">
              <i class="fa-regular fa-pen-to-square btn-icon-main text-lg"></i>
            </button>
            <button class="btn-icon">
              <i class="fa-solid fa-trash btn-icon-danger text-lg"></i>
            </button>
          </div>
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

const setIconColor = (lan: string) => {
  switch (lan) {
    case 'js':
      return 'text-yellow-500'
    case 'ts':
      return 'text-[#3178C6]'
    case 'vuejs':
      return 'text-[#42B883]'
    case 'css3':
      return 'text-[#2965F1]'
    case 'html5':
      return 'text-[#E34F26]'
    case 'react':
      return 'text-[#61DAFB]'
    case 'python':
      return 'text-[#3776AB]'
    case 'java':
      return 'text-[#007396]'
    default:
      return 'text-black-500'
  }
}
</script>

<style scoped>
pre code {
  @apply text-sm sm:text-xs md:text-[10px];
}
</style>
