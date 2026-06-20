import type { ProviderType } from '../../entities/provider/provider.entity'

export type ProviderRatingSort = 'asc' | 'desc'

export interface SearchProviderDto {
    page?: number
    perPage?: number
    search?: string
    type?: ProviderType
    min_avg?: number
    max_avg?: number
    sort_by_avg?: ProviderRatingSort
}
