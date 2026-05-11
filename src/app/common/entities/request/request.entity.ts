/**
 * Request entities based on dawiha-server swagger.yaml
 */

export type RequestStatus = 'PENDING' | 'DONE' | 'CANCELED'

export interface RequestEntity {
    id: number
    provider_id: number
    user_id: number
    category_id?: number
    title: string
    status: RequestStatus
    created_at: string
    updated_at: string
}

export interface RequestsEntity {
    data: RequestEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
