import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    base: './',
    server: {
        port: 7098,
        open: false,
    },
    resolve: {
        alias: {
            'arena-': path.join(__dirname, 'src', 'arena-'),
            'component-': path.join(__dirname, 'src', 'component-'),
            'router-': path.join(__dirname, 'src', 'router-'),
            'style-': path.join(__dirname, 'src', 'style-'),
            'subject-': path.join(__dirname, 'src', 'subject-'),
            'type-': path.join(__dirname, 'src', 'type-'),
            'util-': path.join(__dirname, 'src', 'util-'),
            'tool-': path.join(__dirname, 'src', 'tool-'),
        },
    },
    build: {
        outDir: path.join(__dirname, '..', 'electron-main', 'build-page'),
    },
})
