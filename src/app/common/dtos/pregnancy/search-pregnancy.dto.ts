import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface SearchPregnancyDto {
    page?: number
    perPage?: number
    user_id?: number
    status?: PregnancyStatus
    start_from?: string
    start_to?: string
}
