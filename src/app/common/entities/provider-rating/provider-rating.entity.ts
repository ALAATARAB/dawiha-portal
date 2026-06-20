/**
 * Provider rating entities based on dawiha-server
 */

import type { ProviderEntity } from '../provider/provider.entity'

export interface ProviderRatingUserEntity {
    id: number
    full_name: string
    phone_number?: string | null
    country_code?: string | null
}

export interface ProviderRatingEntity {
    id: number
    user_id: number
    user: ProviderRatingUserEntity
    provider_id: number
    provider: ProviderEntity
    stars: number
    created_at: string
    updated_at: string
}

export interface ProviderRatingsEntity {
    data: ProviderRatingEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
