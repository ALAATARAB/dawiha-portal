/**
 * Appointment entities based on dawiha-server swagger.yaml
 */

export type AppointmentStatus =
    | 'WAITING_PROVIDER_APPROVAL'
    | 'WAITING_CLIENT_APPROVAL'
    | 'RESERVED'
    | 'COMPLETED'
    | 'CANCELLED_BY_PROVIDER'
    | 'CANCELLED_BY_CLIENT'

export interface AppointmentEntity {
    id: number
    provider_id: number
    user_id: number
    date: string
    status: AppointmentStatus
    user_notes?: string
    provider_notes?: string
    created_at: string
    updated_at: string
}

export interface AppointmentsEntity {
    data: AppointmentEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
