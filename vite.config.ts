import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [
        VueRouter(),
        vueDevTools(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'iconify-icon', // isCustomElement: (element) => element.startsWith('iconify-icon'),
                },
            },
        }),
        AutoImport({
            // auto import api
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: [
                // 'vue-router',
                'vue',
                VueRouterAutoImports,
                {
                    pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
                },
            ],
            dts: './auto-imports.d.ts',
            viteOptimizeDeps: true,
            dirs: ['src/stores'],
        }),
        Components({}), // auto import components from /src/components
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
