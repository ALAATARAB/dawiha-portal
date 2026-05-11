import type { WorkDay } from '../../entities/provider-availability/provider-availability.entity'

export interface UpdateProviderAvailabilityDto {
    work_day?: WorkDay
    from?: string
    to?: string
}
