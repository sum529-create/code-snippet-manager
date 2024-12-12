<template>
  <app-card>
    <template #header>
      <h2>{{ item.title }}</h2>
      <font-awesome-icon v-if="isValidLanguage(item.language)" :icon="['fab', item.language]" />
      <font-awesome-icon v-else :icon="['fas', 'code']" />
    </template>
    <template #default>
      {{ item.code }}
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
</script>

<style scoped></style>
