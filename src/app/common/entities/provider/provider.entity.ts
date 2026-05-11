/**
 * Provider entities based on dawiha-server swagger.yaml
 */

export type ProviderType = 'DOCTOR' | 'NURSE' | 'CLINIC' | 'HOSPITAL'

export interface ProviderEntity {
    id: number
    user_id: number
    phone_numbers: string[]
    lat: number
    lng: number
    categories: string[]
    title: string
    type: ProviderType
    about?: string
    booking_fees?: number
    image_id?: number
    description?: string
    created_at: string
    updated_at: string
}

export interface ProvidersEntity {
    data: ProviderEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}

export interface NearestProvidersEntity extends ProvidersEntity {
    data: Array<ProviderEntity & { distance?: number }>
}
