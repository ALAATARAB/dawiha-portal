import type { HistoryType } from '../../entities/history/history.entity'

export interface CreateHistoryDto {
    type: HistoryType
    title: string
    consistent: boolean
    image_ids?: number[]
    description?: string
}
