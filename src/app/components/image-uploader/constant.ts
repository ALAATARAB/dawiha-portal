/**
 * Matches swagger `multipart/form-data` `purpose` on:
 * - `POST /api/v1/admin/medias/upload-media` (admin)
 * - `POST /api/v1/medias/upload-media` (app)
 */
export type MediaUploadPurpose =
    | 'USER_PROFILE'
    | 'PLAN_COVER_IMAGE'
    | 'CATEGORY_ICON'
    | 'SERVICE_COVER_IMAGE'
    | 'THIRD_PARTY_COVER_IMAGE'
    | 'PRODUCT_COVER_IMAGE'
    | 'TASK_DOCUMENTARY_IMAGE'
    | (string & {})

export type UploadedMediaFieldValue = {
    id: number
    url: string
    title?: string | null
    type?: string
}

export interface IImageUploaderProps {
    width?: string
    height?: string
    src?: string | null
    purpose?: MediaUploadPurpose
    /**
     * After upload, calls `onChange` with either the new media id (`id`) or a small
     * `{ id, url, ... }` object (`media`) for forms that store icon-shaped values.
     */
    valueMode?: 'id' | 'media'
    onUploadSuccess?: (media: UploadedMediaFieldValue) => void
    isDisabled?: boolean
    borderRadius?: string
}
