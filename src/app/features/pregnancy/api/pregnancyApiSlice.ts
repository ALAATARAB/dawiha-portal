import type { SearchPregnancyDto } from '../../../common/dtos/pregnancy/search-pregnancy.dto'
import type { UpdatePregnancyDto } from '../../../common/dtos/pregnancy/update-pregnancy.dto'
import type { PregnancyEntity, PregnanciesEntity } from '../../../common/entities/pregnancy/pregnancy.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const pregnancyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPregnancies: builder.query<PregnanciesEntity, SearchPregnancyDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PREGNANCY.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.PREGNANCY],
        }),
        getPregnancy: builder.query<PregnancyEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PREGNANCY.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.PREGNANCY],
        }),
        updatePregnancy: builder.mutation<
            PregnancyEntity,
            { id: number; data: UpdatePregnancyDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.PREGNANCY.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.PREGNANCY],
        }),
        deletePregnancy: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PREGNANCY.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.PREGNANCY],
        }),
    }),
})

export const {
    useGetPregnanciesQuery,
    useLazyGetPregnanciesQuery,
    useGetPregnancyQuery,
    useLazyGetPregnancyQuery,
    useUpdatePregnancyMutation,
    useDeletePregnancyMutation,
} = pregnancyApiSlice
