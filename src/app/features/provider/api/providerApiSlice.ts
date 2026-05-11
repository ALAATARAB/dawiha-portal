import type { SearchProviderDto } from '../../../common/dtos/provider/search-provider.dto'
import type { UpdateProviderDto } from '../../../common/dtos/provider/update-provider.dto'
import type { ProviderEntity, ProvidersEntity } from '../../../common/entities/provider/provider.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const providerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProviders: builder.query<ProvidersEntity, SearchProviderDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PROVIDER.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER],
        }),
        getProvider: builder.query<ProviderEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER],
        }),
        updateProvider: builder.mutation<
            ProviderEntity,
            { id: number; data: UpdateProviderDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.PROVIDER.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.PROVIDER],
        }),
        deleteProvider: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.PROVIDER],
        }),
        // Public endpoint for selection/autocomplete
        getProvidersSelect: builder.query<ProvidersEntity, SearchProviderDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PROVIDER.SELECT,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.SELECT_PROVIDER],
        }),
    }),
})

export const {
    useGetProvidersQuery,
    useLazyGetProvidersQuery,
    useGetProviderQuery,
    useLazyGetProviderQuery,
    useUpdateProviderMutation,
    useDeleteProviderMutation,
    useGetProvidersSelectQuery,
    useLazyGetProvidersSelectQuery,
} = providerApiSlice
