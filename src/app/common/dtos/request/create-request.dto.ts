import type { RequestStatus } from '../../entities/request/request.entity'

/**
 * DTO for creating a request (provider creates for user)
 */
export interface ProviderCreateRequestDto {
    user_id: number
    category_id?: number
    title: string
    notes?: string
    status: RequestStatus
}
