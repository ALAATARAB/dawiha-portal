import type { WorkDay } from '../../entities/provider-availability/provider-availability.entity'

export interface SearchProviderAvailabilityDto {
    page?: number
    perPage?: number
    provider_id?: number
    work_day?: WorkDay
}
