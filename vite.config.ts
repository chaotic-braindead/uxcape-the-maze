import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    build: {
      target: 'node16',
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
});
