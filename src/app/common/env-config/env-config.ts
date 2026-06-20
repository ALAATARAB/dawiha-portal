interface IEnvConfig {
    PROJECT_NAME: string
    /** API host only, without `/api/v1` (e.g. https://api.example.com). */
    API_BASE_URL: string
}

/**
 * Base URL for JSON APIs: `{API_BASE_URL}/api/v1` (see `base-query.ts`).
 * Uploads and other absolute URLs: use `getApiV1Url(path)` when needed.
 */
export const envConfig: IEnvConfig = {
    PROJECT_NAME: import.meta.env.VITE_APP_NAME || 'Dawiha Admin',
    API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
        'http://77.37.86.178:8888/',
}

export function getApiV1Url(path: string): string {
    const base = envConfig.API_BASE_URL.replace(/\/$/, '')
    const p = path.startsWith('/') ? path : `/${path}`
    return `${base}/api/v1${p}`
}
