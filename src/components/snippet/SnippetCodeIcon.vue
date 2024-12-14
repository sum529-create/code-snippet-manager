<template>
  <div
    class="flex justify-center items-center border bg-white h-10 w-10 md:h-9 md:w-9 lg:h-8 lg:w-8 rounded-full"
  >
    <font-awesome-icon
      v-if="isValidLanguage(language)"
      class="w-7 h-7 md:w-5 md:h-5 lg:w-6 lg:h-6"
      :class="setIconColor(language)"
      :icon="['fab', language]"
    />
    <font-awesome-icon v-else :icon="['fas', 'code']" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  language: {
    type: String,
    default: 'code',
  },
})

const validLan = ['vuejs', 'react', 'css3', 'js', 'python', 'java', 'html5']
const isValidLanguage = (codeNm: string) => {
  return validLan.includes(codeNm)
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

<style scoped></style>
