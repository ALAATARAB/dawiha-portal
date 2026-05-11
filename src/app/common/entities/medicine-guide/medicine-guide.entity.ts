/**
 * Medicine Guide entities based on dawiha-server swagger.yaml
 */

export interface MedicineGuideEntity {
    id: number
    title: string
    description: string | null
    uses: string | null
    warnings: string | null
    how_to_use: string | null
    main_info: string | null
    image_id: number | null
    created_at: string
    updated_at: string
}

export interface MedicineGuidesEntity {
    data: MedicineGuideEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
