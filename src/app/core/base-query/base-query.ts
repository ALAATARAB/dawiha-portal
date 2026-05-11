import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { envConfig } from '../../common/env-config/env-config'

function formatBearer(token: string): string {
    const t = token.trim()
    if (t.toLowerCase().startsWith('bearer ')) {
        return t
    }
    return `Bearer ${t}`
}

export const baseQuery = fetchBaseQuery({
    baseUrl: `${envConfig.API_BASE_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth: { token: string | null } }).auth
            .token
        if (token) {
            headers.set('authorization', formatBearer(token))
        }
        return headers
    },
})
