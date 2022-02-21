import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [VantResolve()],
    }),
  ],
});
