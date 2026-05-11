/**
 * Provider Availability entities based on dawiha-server swagger.yaml
 */

export type WorkDay =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'

export interface ProviderAvailabilityEntity {
    id: number
    provider_id: number
    work_day: WorkDay
    from: string
    to: string
    created_at: string
    updated_at: string
}

export interface ProviderAvailabilitiesEntity {
    data: ProviderAvailabilityEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
