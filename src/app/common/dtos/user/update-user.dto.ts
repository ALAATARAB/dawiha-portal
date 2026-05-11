export interface UpdateUserDto {
    full_name?: string
    fcm_token?: string
    birth_date?: string
    gender?: 'MALE' | 'FEMALE'
    role?: 'USER' | 'PROVIDER' | 'ADMIN'
    is_verified?: boolean
    phone_number?: string
    country_code?: string
}
