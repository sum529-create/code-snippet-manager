import { dummySnippets } from '@/data/snippets'
import { defineStore } from 'pinia'

export const useSnippetsStore = defineStore('snippets', {
  state: () => ({
    snippets: dummySnippets,
    selectedLang: '',
    sortBy: 'newest', // newest: 최신순(기본값), oldest: 오래된순, title: 제목순
  }),
  getters: {
    filteredSnippets: (state) => {
      let result = [...state.snippets]

      if (state.selectedLang) {
        result = result.filter((e) => e.language === state.selectedLang)
      }

      if (state.sortBy) {
        result = result.sort((a, b) => {
          if (state.sortBy === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          } else if (state.sortBy === 'oldest') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          } else {
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          }
        })
      }

      return result
    },
  },
  actions: {
    setLanguage(lang: string) {
      this.selectedLang = lang
    },
    setSortBy(sort: 'newest' | 'oldest' | 'title') {
      this.sortBy = sort
    },
  },
})
