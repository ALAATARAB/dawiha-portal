import type { ProviderType } from '../../entities/provider/provider.entity'

export interface UpdateProviderDto {
    phone_numbers?: string[]
    lat?: number
    lng?: number
    categories?: string[]
    title?: string
    type?: ProviderType
    about?: string
    booking_fees?: number
    image_id?: number
    description?: string
}
