/**
 * Media entities based on dawiha-server swagger.yaml
 */

export type MediaPurpose = 'USER' | 'MEDICINE'

export interface MediaEntity {
    id: number
    title: string
    description?: string
    url: string
    type: string
    purpose: MediaPurpose
    width?: number
    height?: number
    size?: number
    duration?: number
    created_at?: string
    updated_at?: string
}

export interface MediasEntity {
    data: MediaEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
