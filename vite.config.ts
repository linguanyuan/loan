/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-21 15:49:47
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", //等同于  assetsPublicPath :'./'
  plugins: [
    vue({
      reactivityTransform: true
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: "@import './src/assets/css/global.less';",
      },
    },
  },
  server: {
    // port: 5001, //启动端口
    // open: true,
    proxy: {
      "/api": {
        target: "http://localhost:6868", //process.env.VITE_BASE_URL
        changeOrigin: true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
        secure: false, // 接受运行在https上，默认不接受
      },
    },
  },
});
