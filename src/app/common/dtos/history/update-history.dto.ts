import type { HistoryType } from '../../entities/history/history.entity'

export interface UpdateHistoryDto {
    type?: HistoryType
    title?: string
    image_id?: number
    description?: string
}
