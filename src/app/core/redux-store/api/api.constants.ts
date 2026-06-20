/**
 * Paths are relative to `{API_BASE_URL}/api/v1` (see `base-query.ts`).
 * Updated for dawiha-server API
 */

export const API_ENDPOINTS = {
    AUTH: {
        /** Admin login endpoint */
        LOGIN: '/admin/auth/login',
        /** User login endpoint (for reference) */
        USER_LOGIN: '/auth/login',
    },
    USER: {
        ME: '/admin/users/me',
        LOGOUT: '/admin/users/logout',
        GET_LIST: '/admin/users',
        GET_ONE: (id: number | string) => `/admin/users/${id}`,
        UPDATE: (id: number | string) => `/admin/users/${id}`,
        /** Alias for list endpoint (user picker / autocomplete). */
        SELECT: '/admin/users',
    },
    MEDIA: {
        /** Admin upload (`AdminMediaController_uploadMedia_v1` in swagger). */
        UPLOAD: '/admin/medias/upload-media',
        GET_LIST: '/admin/medias',
    },
    PROVIDER: {
        GET_LIST: '/admin/providers',
        GET_ONE: (id: number | string) => `/admin/providers/${id}`,
        UPDATE: (id: number | string) => `/admin/providers/${id}`,
        DELETE: (id: number | string) => `/admin/providers/${id}`,
        /** Public endpoint for selection */
        SELECT: '/providers',
    },
    CATEGORY: {
        GET_LIST: '/admin/categories',
        GET_ONE: (id: number | string) => `/admin/categories/${id}`,
        CREATE: '/admin/categories',
        UPDATE: (id: number | string) => `/admin/categories/${id}`,
        DELETE: (id: number | string) => `/admin/categories/${id}`,
        /** Public endpoint for selection */
        SELECT: '/categories',
    },
    APPOINTMENT: {
        GET_LIST: '/admin/appointments',
        GET_ONE: (id: number | string) => `/admin/appointments/${id}`,
        UPDATE: (id: number | string) => `/admin/appointments/${id}`,
        DELETE: (id: number | string) => `/admin/appointments/${id}`,
    },
    HISTORY: {
        GET_LIST: '/admin/histories',
        GET_ONE: (id: number | string) => `/admin/histories/${id}`,
        UPDATE: (id: number | string) => `/admin/histories/${id}`,
        DELETE: (id: number | string) => `/admin/histories/${id}`,
    },
    MEDICINE: {
        GET_LIST: '/admin/medicines',
        GET_ONE: (id: number | string) => `/admin/medicines/${id}`,
        UPDATE: (id: number | string) => `/admin/medicines/${id}`,
        DELETE: (id: number | string) => `/admin/medicines/${id}`,
    },
    MEDICINE_GUIDE: {
        GET_LIST: '/admin/medicine-guides',
        GET_ONE: (id: number | string) => `/admin/medicine-guides/${id}`,
        CREATE: '/admin/medicine-guides',
        UPDATE: (id: number | string) => `/admin/medicine-guides/${id}`,
        DELETE: (id: number | string) => `/admin/medicine-guides/${id}`,
        /** Public endpoint for selection */
        SELECT: '/medicine-guides',
    },
    PREGNANCY: {
        GET_LIST: '/admin/pregnancies',
        GET_ONE: (id: number | string) => `/admin/pregnancies/${id}`,
        UPDATE: (id: number | string) => `/admin/pregnancies/${id}`,
        DELETE: (id: number | string) => `/admin/pregnancies/${id}`,
    },
    PREGNANCY_STAGE: {
        GET_LIST: '/admin/pregnancy-stages',
        GET_ONE: (id: number | string) => `/admin/pregnancy-stages/${id}`,
        CREATE: '/admin/pregnancy-stages',
        UPDATE: (id: number | string) => `/admin/pregnancy-stages/${id}`,
        DELETE: (id: number | string) => `/admin/pregnancy-stages/${id}`,
        /** Public endpoint for selection */
        SELECT: '/pregnancy-stages',
    },
    PROVIDER_AVAILABILITY: {
        GET_LIST: '/admin/provider-availabilities',
        GET_ONE: (id: number | string) => `/admin/provider-availabilities/${id}`,
        UPDATE: (id: number | string) => `/admin/provider-availabilities/${id}`,
        DELETE: (id: number | string) => `/admin/provider-availabilities/${id}`,
        /** Public endpoint for selection */
        SELECT: '/provider-availabilities',
    },
    /** Dashboard endpoints - not in current API, placeholders for future implementation */
    DASHBOARD: {
        GET_COUNTS: '/admin/dashboard/counts', // Placeholder
        GET_DAILY_ACTIVITY: '/admin/dashboard/activity', // Placeholder
    },
    ADS: {
        GET_LIST: '/admin/ads',
        GET_ONE: (id: number | string) => `/admin/ads/${id}`,
        CREATE: '/admin/ads',
        UPDATE: (id: number | string) => `/admin/ads/${id}`,
        DELETE: (id: number | string) => `/admin/ads/${id}`,
    },
    NOTIFICATION: {
        GET_LIST: '/admin/notifications',
        CREATE_CUSTOM: '/admin/notifications/custom',
        MARK_READ: (id: number | string) => `/admin/notifications/read/${id}`,
        DELETE: (id: number | string) => `/admin/notifications/${id}`,
    },
    PROVIDER_RATING: {
        GET_LIST: '/admin/provider-ratings',
        GET_ONE: (id: number | string) => `/admin/provider-ratings/${id}`,
        UPDATE: (id: number | string) => `/admin/provider-ratings/${id}`,
        DELETE: (id: number | string) => `/admin/provider-ratings/${id}`,
    },
}

export const API_METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
} as const
