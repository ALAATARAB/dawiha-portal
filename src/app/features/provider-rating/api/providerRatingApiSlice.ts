import type { SearchProviderRatingsDto } from '../../../common/dtos/provider-rating/search-provider-ratings.dto'
import type { UpdateProviderRatingDto } from '../../../common/dtos/provider-rating/update-provider-rating.dto'
import type {
    ProviderRatingEntity,
    ProviderRatingsEntity,
} from '../../../common/entities/provider-rating/provider-rating.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const providerRatingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProviderRatings: builder.query<
            ProviderRatingsEntity,
            SearchProviderRatingsDto
        >({
            query: (params) => ({
                url: API_ENDPOINTS.PROVIDER_RATING.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER_RATING],
        }),
        getProviderRating: builder.query<ProviderRatingEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER_RATING.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.PROVIDER_RATING],
        }),
        updateProviderRating: builder.mutation<
            ProviderRatingEntity,
            { id: number; data: UpdateProviderRatingDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.PROVIDER_RATING.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [
                API_SLICES_TAGS.PROVIDER_RATING,
                API_SLICES_TAGS.PROVIDER,
            ],
        }),
        deleteProviderRating: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PROVIDER_RATING.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [
                API_SLICES_TAGS.PROVIDER_RATING,
                API_SLICES_TAGS.PROVIDER,
            ],
        }),
    }),
})

export const {
    useGetProviderRatingsQuery,
    useLazyGetProviderRatingsQuery,
    useGetProviderRatingQuery,
    useUpdateProviderRatingMutation,
    useDeleteProviderRatingMutation,
} = providerRatingApiSlice
