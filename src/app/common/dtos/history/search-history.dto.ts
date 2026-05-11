import type { HistoryType } from '../../entities/history/history.entity'

export interface SearchHistoryDto {
    page?: number
    perPage?: number
    search?: string
    user_id?: number
    type?: HistoryType
}
