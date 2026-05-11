/**
 * History entities based on dawiha-server swagger.yaml
 */

export type HistoryType =
    | 'MEDICAL_RECORD'
    | 'PREGNANCY_HISTORY'
    | 'SURGERY_HISTORY'
    | 'ALLERGY_HISTORY'
    | 'MEDICATION_HISTORY'
    | 'FAMILY_HISTORY'

export interface HistoryEntity {
    id: number
    user_id: number
    type: HistoryType
    title: string
    image_id?: number
    description?: string
    created_at: string
    updated_at: string
}

export interface HistoriesEntity {
    data: HistoryEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
