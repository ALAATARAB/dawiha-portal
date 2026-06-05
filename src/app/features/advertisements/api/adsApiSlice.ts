import type { SearchAdsDto } from '../../../common/dtos/ads/search-ads.dto'
import type { CreateAdsDto } from '../../../common/dtos/ads/create-ads.dto'
import type { UpdateAdsDto } from '../../../common/dtos/ads/update-ads.dto'
import type { AdsEntity, AdsListEntity } from '../../../common/entities/ads/ads.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const adsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAds: builder.query<AdsListEntity, SearchAdsDto>({
            query: (params) => ({
                url: API_ENDPOINTS.ADS.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.ADS],
        }),
        getAd: builder.query<AdsEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.ADS.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.ADS],
        }),
        createAd: builder.mutation<AdsEntity, CreateAdsDto>({
            query: (data) => ({
                url: API_ENDPOINTS.ADS.CREATE,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.ADS],
        }),
        updateAd: builder.mutation<
            AdsEntity,
            { id: number; data: UpdateAdsDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.ADS.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.ADS],
        }),
        deleteAd: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.ADS.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.ADS],
        }),
    }),
})

export const {
    useGetAdsQuery,
    useLazyGetAdsQuery,
    useGetAdQuery,
    useLazyGetAdQuery,
    useCreateAdMutation,
    useUpdateAdMutation,
    useDeleteAdMutation,
} = adsApiSlice
