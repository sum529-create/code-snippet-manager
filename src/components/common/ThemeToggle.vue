<template>
  <label class="switch">
    <input type="checkbox" :checked="store.isDark" @change="toggleTheme()" />
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
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const store = useThemeStore()
const { isDark } = storeToRefs(store)
const { toggleTheme } = store
</script>
