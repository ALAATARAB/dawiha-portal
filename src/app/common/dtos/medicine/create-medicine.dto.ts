import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface CreateMedicineDto {
    title: string
    week_day: WeekDay
    quantity: number
    instructions?: string
    description?: string
    dates: string[]
}
