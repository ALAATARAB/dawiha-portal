import type { RequestStatus } from '../../entities/request/request.entity'
import type { CreateHistoryDto } from '../history/create-history.dto'

/**
 * DTO for updating a request (admin)
 */
export interface UpdateRequestDto {
    title?: string
    notes?: string
    status?: RequestStatus
    category_id?: number
    history?: CreateHistoryDto
}

/**
 * DTO for updating a request status (user)
 */
export interface UpdateRequestForUserDto {
    status: RequestStatus
    history?: CreateHistoryDto
}
