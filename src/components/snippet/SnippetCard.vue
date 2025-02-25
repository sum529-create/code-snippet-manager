<template>
  <app-card>
    <template #header>
      <h2 class="flex-1 break-keep clamp-text">{{ item.title }}</h2>
      <snippet-code-icon :language="item.language" />
    </template>
    <template #code>
      <code :class="`language-${getLanClass(item.language)}`">
        {{ item.code }}
      </code>
    </template>
    <template #footer>
      <div class="flex flex-col flex-1 space-y-2">
        <div class="flex gap-1 pb-4 relative flex-wrap">
          <span v-for="(tag, i) in item.tags" :key="i" class="tag cursor-pointer">{{ tag }}</span>
          <span class="absolute left-0 bottom-0 w-full h-px"></span>
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
            {{ formatDate(item.created_at) }}
          </span>
          <div class="flex gap-1 justify-end">
            <button
              @click.prevent.stop="goToPage('SnippetEdit', { id: item.id })"
              class="btn-icon btn-icon-main"
            >
              <i class="fa-regular fa-pen-to-square text-lg"></i>
            </button>
            <button @click.prevent.stop="deleteSnippet" class="btn-icon btn-icon-danger">
              <i class="fa-solid fa-trash text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </template>
  </app-card>
</template>

<script setup lang="ts">
import { useDateTime } from '@/composables/useDateTime'
import { useSnippetsStore } from '@/stores/snippet'
import Prism from 'prismjs'
import { onMounted, nextTick } from 'vue'
import { useNavigation } from '@/composables/useNavigation'

const { goToPage } = useNavigation()
const { formatDate } = useDateTime()

// setup 내부에서
onMounted(() => {
  nextTick(() => {
    Prism.highlightAll()
  })
})

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const getLanClass = (lan: string) => {
  const mapping: Record<string, string> = {
    vuejs: 'js',
    react: 'js',
    css3: 'css',
  }
  return mapping[lan] || 'js'
}

const store = useSnippetsStore()

const deleteSnippet = async () => {
  if (confirm(`${props.item.title}을 삭제하시겠습니까?`)) {
    const { success, error } = await store.deleteSnippet(props.item.id)
    if (success) {
      return alert('해당 스니펫이 삭제되었습니다.')
    } else {
      console.log(error)
    }
  }
}
</script>

<style scoped>
pre code {
  @apply text-sm sm:text-xs md:text-[10px];
}
</style>
