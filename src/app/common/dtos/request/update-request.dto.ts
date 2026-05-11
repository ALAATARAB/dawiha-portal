import type { RequestStatus } from '../../entities/request/request.entity'

/**
 * DTO for updating a request (admin)
 */
export interface UpdateRequestDto {
    title?: string
    status?: RequestStatus
    category_id?: number
}

/**
 * DTO for updating a request status (user)
 */
export interface UpdateRequestForUserDto {
    status: RequestStatus
}
