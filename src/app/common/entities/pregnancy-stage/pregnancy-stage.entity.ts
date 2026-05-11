/**
 * Pregnancy Stage entities based on dawiha-server swagger.yaml
 */

export interface PregnancyStageEntity {
    id: number
    title: string
    week_number: number
    description?: string
    medical_advice?: Record<string, unknown>
    image_id?: number
    created_at: string
    updated_at: string
}

export interface PregnancyStagesEntity {
    data: PregnancyStageEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
