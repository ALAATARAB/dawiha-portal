export interface CreatePregnancyStageDto {
    title: string
    week_number: number
    description?: string
    medical_advice?: Record<string, unknown>
    image_id?: number
}
