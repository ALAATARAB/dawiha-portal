/**
 * Pregnancy entities based on dawiha-server swagger.yaml
 */

export type PregnancyStatus = 'ACTIVE' | 'CANCELED' | 'DONE'

export interface PregnancyEntity {
    id: number
    user_id: number
    status: PregnancyStatus
    start: string
    created_at: string
    updated_at: string
}

export interface PregnanciesEntity {
    data: PregnancyEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
