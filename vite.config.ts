import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/photo',
  plugins: [react()],
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL('./src', import.meta.url)), // @를 입력했을 때, src폴더로 접근 가능
      '@assets' : fileURLToPath(new URL('./src/assets', import.meta.url)), // @assets를 입력했을 때, /src/assets폴더로 접근 가능
      '@components' : fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages' : fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@types' : fileURLToPath(new URL('./src/types', import.meta.url)),
      '@recoil' : fileURLToPath(new URL('./src/recoil', import.meta.url)),
      '@apis' : fileURLToPath(new URL('./src/apis', import.meta.url)),
    },
  },

  // SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/main.scss";`, // 공통적으로 모든 파일에서 적용됨
      },
    },
  },
})
