import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'], // 컴포넌트 폴더 경로
      extensions: ['vue'], // 확장자
      deep: true, // 하위 디렉토리까지 검색
    }),
  ],
  worker: {
    format: 'es',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
