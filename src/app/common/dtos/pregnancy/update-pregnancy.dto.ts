import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface UpdatePregnancyDto {
    status?: PregnancyStatus
    start?: string
}
