export type PregnancyStatus = 'ACTIVE' | 'CANCELED' | 'DONE'

export interface SearchUserDto {
    page?: number
    perPage?: number
    role?: Array<'USER' | 'PROVIDER' | 'ADMIN'>
    gender?: 'MALE' | 'FEMALE'
    name?: string
    phone_number?: string
    country_code?: string
    created_at_from?: string
    created_at_to?: string
    pregnancy_status?: PregnancyStatus
    from_age?: number
    to_age?: number
}
