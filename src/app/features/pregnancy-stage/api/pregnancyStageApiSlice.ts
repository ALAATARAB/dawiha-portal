import type { CreatePregnancyStageDto } from '../../../common/dtos/pregnancy-stage/create-pregnancy-stage.dto'
import type { SearchPregnancyStageDto } from '../../../common/dtos/pregnancy-stage/search-pregnancy-stage.dto'
import type { UpdatePregnancyStageDto } from '../../../common/dtos/pregnancy-stage/update-pregnancy-stage.dto'
import type { PregnancyStageEntity, PregnancyStagesEntity } from '../../../common/entities/pregnancy-stage/pregnancy-stage.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const pregnancyStageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPregnancyStages: builder.query<PregnancyStagesEntity, SearchPregnancyStageDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.PREGNANCY_STAGE],
        }),
        getPregnancyStage: builder.query<PregnancyStageEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.PREGNANCY_STAGE],
        }),
        createPregnancyStage: builder.mutation<PregnancyStageEntity, CreatePregnancyStageDto>({
            query: (data) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.CREATE,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.PREGNANCY_STAGE],
        }),
        updatePregnancyStage: builder.mutation<
            PregnancyStageEntity,
            { id: number; data: UpdatePregnancyStageDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.PREGNANCY_STAGE],
        }),
        deletePregnancyStage: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.PREGNANCY_STAGE],
        }),
        // Public endpoint for selection/autocomplete
        getPregnancyStagesSelect: builder.query<PregnancyStagesEntity, SearchPregnancyStageDto>({
            query: (params) => ({
                url: API_ENDPOINTS.PREGNANCY_STAGE.SELECT,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.SELECT_PREGNANCY_STAGE],
        }),
    }),
})

export const {
    useGetPregnancyStagesQuery,
    useLazyGetPregnancyStagesQuery,
    useGetPregnancyStageQuery,
    useLazyGetPregnancyStageQuery,
    useCreatePregnancyStageMutation,
    useUpdatePregnancyStageMutation,
    useDeletePregnancyStageMutation,
    useGetPregnancyStagesSelectQuery,
    useLazyGetPregnancyStagesSelectQuery,
} = pregnancyStageApiSlice
