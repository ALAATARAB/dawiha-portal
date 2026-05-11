import type { SearchProviderAvailabilityDto } from '../../../common/dtos/provider-availability/search-provider-availability.dto'
import type { UpdateProviderAvailabilityDto } from '../../../common/dtos/provider-availability/update-provider-availability.dto'
import type { ProviderAvailabilityEntity, ProviderAvailabilitiesEntity } from '../../../common/entities/provider-availability/provider-availability.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const providerAvailabilityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProviderAvailabilities: builder.query<ProviderAvailabilitiesEntity, SearchProviderAvailabilityDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PROVIDER_AVAILABILITY.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER_AVAILABILITY],
        }),
        getProviderAvailability: builder.query<ProviderAvailabilityEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER_AVAILABILITY.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER_AVAILABILITY],
        }),
        updateProviderAvailability: builder.mutation<
            ProviderAvailabilityEntity,
            { id: number; data: UpdateProviderAvailabilityDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.PROVIDER_AVAILABILITY.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.PROVIDER_AVAILABILITY],
        }),
        deleteProviderAvailability: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER_AVAILABILITY.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.PROVIDER_AVAILABILITY],
        }),
        // Public endpoint for selection/autocomplete
        getProviderAvailabilitiesSelect: builder.query<ProviderAvailabilitiesEntity, SearchProviderAvailabilityDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PROVIDER_AVAILABILITY.SELECT,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.SELECT_PROVIDER_AVAILABILITY],
        }),
    }),
})

export const {
    useGetProviderAvailabilitiesQuery,
    useLazyGetProviderAvailabilitiesQuery,
    useGetProviderAvailabilityQuery,
    useLazyGetProviderAvailabilityQuery,
    useUpdateProviderAvailabilityMutation,
    useDeleteProviderAvailabilityMutation,
    useGetProviderAvailabilitiesSelectQuery,
    useLazyGetProviderAvailabilitiesSelectQuery,
} = providerAvailabilityApiSlice
