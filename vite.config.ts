import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd())
    const base = process.env.CI ? '/dawiha-portal/' : '/'

    return defineConfig({
        // Set base path for GitHub/GitLab Pages
        // Uses '/dawiha-portal/' for both GitHub and GitLab Pages
        base: base,
        define: {
            'import.meta.env': {
                ...env,
                MODE: mode,
                BASE_URL: JSON.stringify(base),
            },
        },
        plugins: [react()],
    })
}
