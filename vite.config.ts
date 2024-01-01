import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    // nodePolyfills({
    //   include: ['os'],
    //   exclude: [
    //   ],
      // Whether to polyfill specific globals.
      // globals: {
      //   Buffer: true, // can also be 'build', 'dev', or false
      //   global: true,
      //   process: true,
      // },
      // Override the default polyfills for specific modules.
      // overrides: {
      //   // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
      //   fs: 'memfs',
      // },
      // Whether to polyfill `node:` protocol imports.
      // protocolImports: true,
  //   }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  }
}));
