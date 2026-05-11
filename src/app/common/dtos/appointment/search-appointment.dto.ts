import type { AppointmentStatus } from '../../entities/appointment/appointment.entity'

export interface SearchAppointmentDto {
    page?: number
    perPage?: number
    provider_id?: number
    user_id?: number
    status?: AppointmentStatus
}
