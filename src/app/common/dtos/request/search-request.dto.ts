import type { RequestStatus } from '../../entities/request/request.entity'
import type { BaseSearchDto } from '../common/base-search.dto'

/**
 * DTO for searching/filtering requests
 */
export interface SearchRequestDto extends BaseSearchDto {
    provider_id?: number
    user_id?: number
    category_id?: number
    title?: string
    status?: RequestStatus
}
