import type { SearchHistoryDto } from '../../../common/dtos/history/search-history.dto'
import type { UpdateHistoryDto } from '../../../common/dtos/history/update-history.dto'
import type { HistoryEntity, HistoriesEntity } from '../../../common/entities/history/history.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHistories: builder.query<HistoriesEntity, SearchHistoryDto>({
            query: (params) => ({
                url: API_ENDPOINTS.HISTORY.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.HISTORY],
        }),
        getHistory: builder.query<HistoryEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.HISTORY.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.HISTORY],
        }),
        updateHistory: builder.mutation<
            HistoryEntity,
            { id: number; data: UpdateHistoryDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.HISTORY.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.HISTORY],
        }),
        deleteHistory: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.HISTORY.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.HISTORY],
        }),
    }),
})

export const {
    useGetHistoriesQuery,
    useLazyGetHistoriesQuery,
    useGetHistoryQuery,
    useLazyGetHistoryQuery,
    useUpdateHistoryMutation,
    useDeleteHistoryMutation,
} = historyApiSlice
