import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface UpdateMedicineDto {
    title?: string
    week_day?: WeekDay
    quantity?: number
    instructions?: string
    description?: string
    dates?: string[]
}
