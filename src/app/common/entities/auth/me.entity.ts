/**
 * MeEntity - User profile information from /admin/users/me
 * Based on dawiha-server swagger.yaml
 */

export type MeRole = 'USER' | 'PROVIDER' | 'ADMIN'

export interface MeEntity {
    id: number
    full_name: string
    phone_number: string
    country_code: string
    birth_date?: string
    gender?: 'MALE' | 'FEMALE'
    fcm_token?: string
    is_verified: boolean
    role: MeRole
    created_at: string
    updated_at: string
}

/**
 * FullAuthenticationEntity - Login response
 */
export interface FullAuthenticationEntity {
    user: MeEntity
    accessToken: string
}

/**
 * BaseActorEntity - User list item
 */
export interface BaseActorEntity {
    id: number
    full_name: string
    phone_number: string
    country_code: string
    birth_date?: string
    gender?: 'MALE' | 'FEMALE'
    is_verified: boolean
    role: 'USER' | 'PROVIDER' | 'ADMIN'
    created_at: string
    updated_at: string
}

/**
 * BaseActorsEntity - Paginated user list response
 */
export interface BaseActorsEntity {
    data: BaseActorEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
