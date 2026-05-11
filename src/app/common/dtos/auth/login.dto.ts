/**
 * LoginDTO - Admin login request
 * Based on dawiha-server UserLoginDto
 */
export interface LoginDTO {
    phone_number: string
    country_code: string
    password: string
    fcm_token?: string
}
