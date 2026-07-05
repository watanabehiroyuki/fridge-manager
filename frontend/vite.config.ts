import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 5173, // 開発サーバーのポート（任意）
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            console.log(
              "[proxyReq]",
              req.method,
              req.url,
              "->",
              proxyReq.getHeader("host")
            );
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log("[proxyRes]", req.method, req.url, proxyRes.statusCode);
          });
        },
      },
    },
  },
});
