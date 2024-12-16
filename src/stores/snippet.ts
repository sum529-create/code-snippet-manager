import { supabase } from '@/lib/supabase'
import type { Snippet } from '@/types/snippet'
import { defineStore } from 'pinia'

export const useSnippetsStore = defineStore('snippets', {
  state: () => ({
    snippets: [] as Snippet[],
    isLoading: false,
    error: null,
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
    async createSnippet(snippet: Omit<Snippet, 'id' | 'createdAt'>) {
      try {
        const { data, error } = await supabase.from('snippets').insert([snippet]).select()

        if (error) {
          throw error
        }
        if (data) {
          this.snippets.unshift(data[0])
        }
        return { success: true }
      } catch (error) {
        console.error('Failed To Create Snippet: ', error)
        return { success: false, error }
      }
    },
    setLanguage(lang: string) {
      this.selectedLang = lang
    },
    setSortBy(sort: 'newest' | 'oldest' | 'title') {
      this.sortBy = sort
    },
  },
})
