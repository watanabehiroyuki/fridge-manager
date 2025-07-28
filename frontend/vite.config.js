import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',           // プロジェクトルート（必要なら変更）
  base: './', 
  publicDir: 'public', // 静的ファイル用
  build: {
    outDir: 'dist',    // ビルド出力先
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        login: resolve(__dirname, 'login.html'),
        fridges: resolve(__dirname, 'fridges.html'),
        fridgeDetail: resolve(__dirname, 'fridgeDetail.html'),
        userShare: resolve(__dirname, 'userShare.html')
      },
    },
  },
  server: {
    port: 5173,        // 開発サーバーのポート（任意）
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
});