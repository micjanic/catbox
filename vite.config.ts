import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/CircleSliders.tsx'),
      name: '@micjanic/circle-sliders',
      fileName: (format) => `circle-sliders.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@pixi/react', 'pixi.js'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [react()],
});
