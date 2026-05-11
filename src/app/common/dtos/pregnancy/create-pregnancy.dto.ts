import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface CreatePregnancyDto {
    status: PregnancyStatus
    start: string
}
