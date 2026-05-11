import type { AppointmentStatus } from '../../entities/appointment/appointment.entity'

export interface UpdateAppointmentDto {
    date?: string
    status?: AppointmentStatus
    user_notes?: string
    provider_notes?: string
}
