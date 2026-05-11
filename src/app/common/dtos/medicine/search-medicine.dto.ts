import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface SearchMedicineDto {
    page?: number
    perPage?: number
    search?: string
    user_id?: number
    week_day?: WeekDay
}
