import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd())
    return defineConfig({
        // Set base path for GitLab Pages
        // Change 'dawiha-portal' to your actual GitLab repository name if different
        base: process.env.CI ? '/dawiha-portal/' : '/',
        define: {
            'import.meta.env': {
                ...env,
                MODE: mode,
            },
        },
        plugins: [react()],
    })
}
