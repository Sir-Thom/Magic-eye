import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1620,
    strictPort: true,

    
   
  },
  test: {
    testMatch: ["**/tests/*.test.ts", "**/tests/*.test.tsx"],
    // https://jestjs.io/docs/configuration#testenvironment-string
    // https://jestjs.io/docs/ecmascript-modules
    //
    // 1. use the same environment as jest
    env: "jsdom",
    globals: true,
    // 2. use the same transform as jest
   
  },

  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],

}));
