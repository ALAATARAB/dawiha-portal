/**
 * Request entities based on dawiha-server swagger.yaml
 */

import type { CategoryEntity } from '../category/category.entity'
import type { ProviderEntity } from '../provider/provider.entity'
import type { BaseActorEntity } from '../user/user.entity'

export type RequestStatus = 'PENDING' | 'DONE' | 'CANCELED'

export interface RequestEntity {
    id: number
    provider_id: number
    provider: ProviderEntity
    user_id: number
    user: BaseActorEntity
    category_id?: number
    category?: CategoryEntity
    title: string
    notes?: string
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
