import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
const __dirname = resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@assets', replacement: resolve(__dirname, './src/assets') },
      { find: '@utils', replacement: resolve(__dirname, './src/utils') },
      { find: '@hooks', replacement: resolve(__dirname, './src/hooks') },
      { find: '@contexts', replacement: resolve(__dirname, './src/contexts') },
      { find: '@layouts', replacement: resolve(__dirname, './src/layouts') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages') },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      { find: '@typings', replacement: resolve(__dirname, './src/typings') },
    ],
  },
});
