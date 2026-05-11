import type { AppointmentStatus } from '../../entities/appointment/appointment.entity'

export interface CreateAppointmentDto {
    provider_id: number
    date: string
    status: AppointmentStatus
    user_notes?: string
}
