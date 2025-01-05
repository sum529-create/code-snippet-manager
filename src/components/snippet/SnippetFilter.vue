<template>
  <div
    class="filter-wrapper flex flex-wrap flex-col md:space-y-2 px-6 py-3 bg-gray-100 shadow-md rounded-lg"
  >
    <div class="gap-2.5 relative pb-2 hidden md:flex">
      <button class="toggle-btn" @click="$emit('layout', 0)">
        <span class="btn-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
            />
          </svg>
          <span> Grid </span>
        </span>
      </button>
      <button class="toggle-btn" @click="$emit('layout', 1)">
        <span class="btn-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
            />
          </svg>
          <span> List </span>
        </span>
      </button>
      <span class="separator absolute left-0 bottom-0 w-full h-px bg-gray-300"></span>
    </div>
    <div class="flex flex-row flex-wrap gap-4 relative pb-2 last:pb-0">
      <div class="flex items-center gap-2">
        <label for="lang">언어 선택</label>
        <select name="lang" id="lang" v-model="selLang">
          <option value="">전체</option>
          <option v-for="(lan, i) in snippets" :key="i" :value="lan.language">
            {{ lan.language }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label for="sort">정렬 기준</label>
        <select name="sort" id="sort" v-model="sort">
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="title">제목</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSnippetsStore } from '@/stores/snippet'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

defineEmits(['layout'])

interface FilterState {
  viewType: 'grid' | 'list'
  language: string
  sortBy: 'newest' | 'oldest' | 'title'
}

const store = useSnippetsStore()
const { selectedLang, sortBy, snippets } = storeToRefs(store)

const selLang = ref(selectedLang)
const sort = ref(sortBy)
</script>

<style scoped></style>
