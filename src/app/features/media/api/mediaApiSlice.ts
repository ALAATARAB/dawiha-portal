import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'

/**
 * Swagger `MediaEntity` — 201 response from
 * `AdminMediaController_uploadMedia_v1` (`POST /api/v1/admin/medias/upload-media`).
 */
export type MediaEntity = {
    id: number
    title: string
    url: string
    type: string
    purpose: string
    description?: string | null
    width?: number | null
    height?: number | null
    size?: number | null
    duration?: number | null
}

export type UploadMediaArgs = {
    file: File
    /** Swagger multipart `purpose` enum (e.g. `CATEGORY_ICON`). */
    purpose: string
}

export const mediaApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadMedia: builder.mutation<MediaEntity, UploadMediaArgs>({
            query: ({ file, purpose }) => {
                const body = new FormData()
                body.append('file', file)
                body.append('purpose', purpose)
                return {
                    url: API_ENDPOINTS.MEDIA.UPLOAD,
                    method: API_METHODS.POST,
                    body,
                }
            },
        }),
    }),
})

export const { useUploadMediaMutation } = mediaApiSlice
