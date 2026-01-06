import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 8080,
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/components/CatBox.tsx'),
            name: '@micjanic/catbox',
            fileName: (format) => `catbox.${format}.js`,
        },
        rollupOptions: {
            // Bundle PIXI and @pixi/react inside the library; keep React external
            external: [
                'react',
                'react-dom',
                'tailwindcss',
            ],
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
                globals: {
                    react: 'React',
                    // react-dom is external; provide its UMD global
                    'react-dom': 'ReactDOM',
                },
            },
        },
        outDir: 'dist',
        sourcemap: true,
    },
    plugins: [react()],
})
