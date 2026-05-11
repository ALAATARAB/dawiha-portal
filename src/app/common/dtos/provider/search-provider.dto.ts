import type { ProviderType } from '../../entities/provider/provider.entity'

export interface SearchProviderDto {
    page?: number
    perPage?: number
    search?: string
    type?: ProviderType
}
