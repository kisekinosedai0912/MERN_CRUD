import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        AutoImport({
            // Auto import things like React, useState, useEffect, etc.
            imports: [
              'react',
              'react-router-dom'
            ],
            dts: 'src/auto-imports.d.ts', // generates auto-imports typings
            eslintrc: {
              enabled: true, // generate eslint config for auto imports
            },
        }),
    ],
})
