import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',           // プロジェクトルート（必要なら変更）
  publicDir: 'public', // 静的ファイル用
  build: {
    outDir: 'dist',    // ビルド出力先
    rollupOptions: {
      input: {
        register: resolve(__dirname, 'register.html'),
        // login: 'public/login.html',
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


