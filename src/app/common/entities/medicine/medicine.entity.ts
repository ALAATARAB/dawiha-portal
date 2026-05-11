/**
 * Medicine entities based on dawiha-server swagger.yaml
 */

export type WeekDay =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'

export interface MedicineEntity {
    id: number
    user_id: number
    title: string
    week_day: WeekDay
    quantity: number
    instructions?: string
    description?: string
    dates: string[]
    created_at: string
    updated_at: string
}

export interface MedicinesEntity {
    data: MedicineEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
